//
//  HomeView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/12/25.
//

import SwiftUI

// MARK: - 主视图（含五大 Tab）
struct HomeView: View {
    // 当前选中的 Tab 索引
    @State private var selectedTab = 0
    
    // ========== 原主页所需状态 ==========
    @State private var adViews: [AnyView] = []
    @State private var currentAdIndex = 0
    @State private var timer: Timer?
    @State private var showForumView = false    // 旧逻辑保留
    @State private var bottomSafeArea: CGFloat = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            // ① 主页
            homeTab
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("主页")
                }
                .tag(0)
            
//            // ② 论坛
//            NavigationStack {
//                ForumView()
//            }
//            .tabItem {
//                Image(systemName: "bubble.left.and.bubble.right.fill")
//                Text("论坛")
//            }
//            .tag(1)
            
            // ③ 塔罗宫能（占位）
            NavigationStack {
                TarotEnergyView()
            }
            .tabItem {
                Image(systemName: "square.grid.3x3.fill")
                Text("塔罗宫能")
            }
            .tag(1)
            
//            // ④ 塔罗屋（占位）
//            NavigationStack {
//                TarotHouseView()
//            }
//            .tabItem {
//                Image(systemName: "archivebox.fill")
//                Text("塔罗屋")
//            }
//            .tag(2)
            
            // ⑤ 账号中心
            NavigationStack {
                AccountView()
            }
            .tabItem {
                Image(systemName: "person.crop.circle.fill")
                Text("我")
            }
            .tag(2)
        }
        .onAppear {
            initializeAdViews()
            startAutoScroll()
            updateSafeAreaInsets()
        }
        .onDisappear {
            stopAutoScroll()
        }
        .preferredColorScheme(.dark)
    }
}

// MARK: - 主页 Tab 内容
private extension HomeView {
    var homeTab: some View {
        NavigationStack {
            ZStack {
                // 深紫色渐变背景
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.15, green: 0.05, blue: 0.25),
                        Color(red: 0.25, green: 0.1, blue: 0.4)
                    ]),
                    startPoint: .top,
                    endPoint: .bottom
                )
                .edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 0) {
                    // 顶部标题栏
                    headerSection
                    
                    // 主内容滚动区
                    ScrollView {
                        VStack(spacing: 25) {
                            // 快速占卜入口
                            NavigationLink(destination: QuickDivinationView()) {
                                quickDivinationSection
                            }
                            
                            // 广告轮播组件
                            adCarouselSection
                            
                            // 每日塔罗话题
                            dailyTopicsSection
                        }
                        .padding(.horizontal, 20)
                        .padding(.top, 15)
                    }
                }
            }
            .navigationBarHidden(true)
        }
    }

    // 初始化广告视图
    private func initializeAdViews() {
        adViews = [
            AnyView(AdView1(action: { handleAdTap(index: 0) })),
            AnyView(AdView2(action: { handleAdTap(index: 1) })),
            AnyView(AdView3(action: { handleAdTap(index: 2) })),
            AnyView(AdView4(action: { handleAdTap(index: 3) })),
            AnyView(AdView5(action: { handleAdTap(index: 4) }))
        ]
    }
    
    // 更新安全区
    private func updateSafeAreaInsets() {
        guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let window = windowScene.windows.first else { return }
        bottomSafeArea = window.safeAreaInsets.bottom
    }
    
    // MARK: - 顶部 Header
    private var headerSection: some View {
        HStack {
            Image(systemName: "moon.stars.fill")
                .font(.title)
                .foregroundColor(.white)
                .padding(10)
                .background(
                    Circle().fill(
                        LinearGradient(
                            colors: [Color(red: 0.7, green: 0.5, blue: 1.0), .purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                )
                .shadow(color: .purple.opacity(0.8), radius: 5)
            
            VStack(alignment: .leading, spacing: 2) {
                Text("梦多塔")
                    .font(.title2).fontWeight(.bold)
                    .foregroundColor(.white).shadow(color: .purple, radius: 3)
                Text("你的塔罗未必只是塔罗")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .opacity(0.9)
            }
            
            Spacer()
            
            HStack(spacing: 15) {
                NavigationLink(destination: NotificationsView()) {
                    Image(systemName: "bell.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Circle().fill(Color.purple.opacity(0.4)))
                }
                Button {
                    // 切换到“账号”标签
                    selectedTab = 4
                } label: {
                    Image(systemName: "gearshape.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Circle().fill(Color.purple.opacity(0.4)))
                }
            }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 15)
        .background(
            Color(red: 0.2, green: 0.1, blue: 0.35)
                .opacity(0.8)
                .edgesIgnoringSafeArea(.top)
        )
    }
    
    // MARK: - 快速占卜 Section（由外层 NavigationLink 触发）
    private var quickDivinationSection: some View {
        VStack(spacing: 15) {
            Text("快速占卜")
                .font(.title3).fontWeight(.bold)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.leading, 5)
            
            VStack(spacing: 15) {
                Image(systemName: "sparkles")
                    .font(.system(size: 40))
                    .symbolEffect(.bounce, options: .repeating)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                
                Text("点击开始神秘占卜")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding(.bottom, 10)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 25)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(
                        LinearGradient(
                            colors: [Color(red: 0.5, green: 0.2, blue: 0.8),
                                     Color(red: 0.4, green: 0.1, blue: 0.6)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .shadow(color: .purple.opacity(0.7), radius: 15, y: 5)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 20)
                    .stroke(
                        LinearGradient(
                            colors: [Color(red: 0.8, green: 0.5, blue: 1.0), .purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 2
                    )
            )
        }
    }
    
    // MARK: - 广告轮播 Section
    private var adCarouselSection: some View {
        VStack(spacing: 15) {
            Text("特别推荐")
                .font(.title3).fontWeight(.bold)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.leading, 5)
            
            GeometryReader { geo in
                TabView(selection: $currentAdIndex) {
                    ForEach(0..<adViews.count, id: \.self) { idx in
                        adViews[idx]
                            .frame(width: geo.size.width)
                            .tag(idx)
                    }
                }
                .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
                .frame(height: 180)
                .onChange(of: currentAdIndex) { _ in resetAutoScroll() }
            }
            .frame(height: 200)
        }
    }
    
    private func handleAdTap(index: Int) {
        print("点击了广告 #\(index+1)")
    }
    
    // MARK: - 每日塔罗话题 Section
    private var dailyTopicsSection: some View {
        VStack(spacing: 15) {
            HStack {
                Text("每日塔罗话题")
                    .font(.title3).fontWeight(.bold)
                    .foregroundColor(.white)
                Spacer()
                NavigationLink(destination: DailyTopicsView()) {
                    Text("查看全部")
                    .font(.subheadline)
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                }
            }
            .padding(.horizontal, 5)
            
            LazyVGrid(columns: [
                GridItem(.flexible(), spacing: 15),
                GridItem(.flexible())
            ], spacing: 15) {
                ForEach(1...10, id: \.self) { i in
                    dailyTopicCard(index: i)
                }
            }
        }
    }
    
    private func dailyTopicCard(index: Int) -> some View {
        let cardColors: [Color] = [
            Color(red: 0.6, green: 0.3, blue: 0.8),
            Color(red: 0.5, green: 0.2, blue: 0.7),
            Color(red: 0.4, green: 0.1, blue: 0.6),
            Color(red: 0.7, green: 0.4, blue: 0.9)
        ]
        let symbols = ["heart.fill","star.fill","moon.fill","sun.max.fill","sparkles"]
        
        return Button(action: {
            print("点击了话题 #\(index)")
        }) {
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Image(systemName: symbols[index % symbols.count])
                        .font(.system(size: 20))
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Circle().fill(Color.white.opacity(0.2)))
                    Spacer()
                    Text("\(index)天前")
                        .font(.caption2)
                        .foregroundColor(.white.opacity(0.7))
                }
                Text("塔罗话题 #\(index)")
                    .font(.headline).fontWeight(.medium).foregroundColor(.white)
                    .padding(.top, 5)
                Text("探索塔罗牌的深层含义与智慧")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .lineLimit(2)
                    .padding(.top, 2)
            }
            .padding(15)
            .frame(maxWidth: .infinity)
            .background(RoundedRectangle(cornerRadius: 15).fill(cardColors[index % cardColors.count]))
            .overlay(RoundedRectangle(cornerRadius: 15).stroke(Color.white.opacity(0.2), lineWidth: 1))
        }
    }
    
    // MARK: - 自动滚动逻辑
    private func startAutoScroll() {
        stopAutoScroll()
        timer = Timer.scheduledTimer(withTimeInterval: 8.0, repeats: true) { _ in
            withAnimation(.easeInOut(duration: 0.8)) {
                currentAdIndex = (currentAdIndex + 1) % adViews.count
            }
        }
    }
    private func stopAutoScroll() {
        timer?.invalidate()
        timer = nil
    }
    private func resetAutoScroll() {
        stopAutoScroll()
        startAutoScroll()
    }
}

// MARK: - 预览
struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
