//
//  ForumView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/12/25.
//

import SwiftUI

struct ForumView: View {
    @State private var posts: [Post] = Post.samplePosts
    @State private var showingNewPostView = false
    @State private var searchText = ""
    
    // 新增：当前选中的标签（nil 表示不筛选）
    @State private var selectedTopic: String? = nil
    
    var body: some View {
        ZStack {
            // 深紫色渐变背景（与主页一致）
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
                // 顶部导航栏
                headerSection
                
                // 主内容区
                ScrollView {
                    VStack(spacing: 15) {
                        // 搜索栏
                        searchSection
                        
                        // 热门话题
                        hotTopicsSection
                        
                        // 帖子列表
                        postsListSection
                    }
                    .padding(.horizontal, 15)
                    .padding(.top, 10)
                }
                
                // 底部发帖按钮
                newPostButton
            }
        }
        .sheet(isPresented: $showingNewPostView) {
            NewPostView()
        }
    }
    
    // MARK: - 子视图
    
    private var headerSection: some View {
        HStack {
            Text("塔罗论坛")
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .shadow(color: .purple, radius: 5)
            
            Spacer()
            
            HStack(spacing: 15) {
                NavigationLink(destination: NotificationsView()) {
                    Image(systemName: "bell.fill")
                        .font(.title2)
                        .foregroundColor(.white)
                        .padding(10)
                        .background(
                            Circle()
                                .fill(Color.purple.opacity(0.4))
                        )
                }
//                Button(action: {}) {
//                    Image(systemName: "gearshape.fill")
//                        .font(.title2)
//                        .foregroundColor(.white)
//                        .padding(10)
//                        .background(
//                            Circle()
//                                .fill(Color.purple.opacity(0.4))
//                        )
//                }
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
    
    private var searchSection: some View {
        HStack {
            TextField("搜索帖子、话题...", text: $searchText)
                .padding(12)
                .padding(.leading, 35)
                .background(Color.purple.opacity(0.3))
                .cornerRadius(15)
                .foregroundColor(.white)
                .overlay(
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.white.opacity(0.7))
                            .padding(.leading, 12)
                        
                        Spacer()
                    }
                )
            
            Button(action: {}) {
                Image(systemName: "slider.horizontal.3")
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding(10)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.purple.opacity(0.4))
                    )
            }
        }
    }
    
    private var hotTopicsSection: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("热门话题")
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 15) {
                    ForEach(1...5, id: \.self) { index in
                        hotTopicCard(index: index)
                    }
                }
            }
        }
    }
    
    private func hotTopicCard(index: Int) -> some View {
        let topics = [
            "爱情占卜",
            "事业解读",
            "每日运势",
            "塔罗教学",
            "牌意解析"
        ]
        
        let colors: [Color] = [
            Color(red: 0.8, green: 0.3, blue: 0.6),
            Color(red: 0.4, green: 0.5, blue: 0.9),
            Color(red: 0.3, green: 0.7, blue: 0.5),
            Color(red: 0.9, green: 0.6, blue: 0.3),
            Color(red: 0.5, green: 0.3, blue: 0.8)
        ]
        
        let topic = topics[index-1]
        let isSelected = (selectedTopic == topic)
        
        return Button(action: {
            // 切换过滤标签：再次点击同一标签可清除筛选
            if selectedTopic == topic {
                selectedTopic = nil
            } else {
                selectedTopic = topic
            }
        }) {
            Text("#\(topic)")
                .font(.headline)
                .foregroundColor(isSelected ? .black : .white)
                .padding(.horizontal, 20)
                .padding(.vertical, 10)
                .background(
                    Capsule()
                        .fill(isSelected ? Color.white : colors[index-1])
                )
        }
    }
    
    private var postsListSection: some View {
        VStack(spacing: 15) {
            // 根据 selectedTopic 筛选
            ForEach(posts.filter { post in
                guard let tag = selectedTopic else { return true }
                // 假设 Post 有 tags 属性
                return post.tags.contains(tag)
            }) { post in
                NavigationLink(destination: PostDetailView(post: post)) {
                    postCard(post: post)
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
        .padding(.top, 20)
    }
    
    private func postCard(post: Post) -> some View {
        VStack(alignment: .leading, spacing: 15) {
            // 作者信息
            HStack {
                Image(post.authorAvatar)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 40, height: 40)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.white.opacity(0.5), lineWidth: 1))
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(post.author)
                        .font(.headline)
                        .foregroundColor(.white)
                    
                    Text(post.relativeTime)
                        .font(.caption)
                        .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                }
                
                Spacer()
                
                Button(action: {
                    // 关注作者
                    print("关注了 \(post.author)")
                }) {
                    Text("关注")
                        .font(.caption)
                        .bold()
                        .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(
                            Capsule()
                                .stroke(Color(red: 0.8, green: 0.5, blue: 1.0), lineWidth: 1)
                        )
                }
            }
            
            // 帖子内容
            VStack(alignment: .leading, spacing: 10) {
                Text(post.title)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .lineLimit(2)
                
                Text(post.content)
                    .font(.body)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .lineLimit(3)
            }
            
            // 互动按钮
            HStack(spacing: 25) {
                Button(action: {
                    // 点赞/取消点赞
                    if let idx = posts.firstIndex(where: { $0.id == post.id }) {
                        posts[idx].isLiked.toggle()
                        posts[idx].likes += post.isLiked ? -1 : 1
                    }
                }) {
                    HStack(spacing: 5) {
                        Image(systemName: post.isLiked ? "heart.fill" : "heart")
                            .foregroundColor(post.isLiked ? .red : Color(red: 0.8, green: 0.7, blue: 1.0))
                        
                        Text("\(post.likes)")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }
                
                Button(action: {
                    // 评论
                    print("评论帖子: \(post.title)")
                }) {
                    HStack(spacing: 5) {
                        Image(systemName: "bubble.left")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        
                        Text("\(post.comments)")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }
                
                Button(action: {
                    // 分享
                    print("分享帖子: \(post.title)")
                }) {
                    HStack(spacing: 5) {
                        Image(systemName: "arrowshape.turn.up.right")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        
                        Text("分享")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }
                
                Spacer()
            }
            .padding(.top, 5)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 15)
                .fill(Color(red: 0.25, green: 0.15, blue: 0.4))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 15)
                .stroke(Color.purple.opacity(0.5), lineWidth: 1)
        )
    }
    
    private var newPostButton: some View {
        Button(action: {
            showingNewPostView = true
        }) {
            HStack {
                Image(systemName: "plus.circle.fill")
                    .font(.title)
                    .foregroundColor(.white)
                
                Text("发布新帖")
                    .font(.headline)
                    .foregroundColor(.white)
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(
                LinearGradient(
                    colors: [Color(red: 0.7, green: 0.3, blue: 0.9), .purple],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .cornerRadius(0)
        }
    }
}

struct ForumView_Previews: PreviewProvider {
    static var previews: some View {
        ForumView()
            .preferredColorScheme(.dark)
    }
}
