import SwiftUI

struct TarotEnergyView: View {
    var body: some View {
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
                
                // 静态星空背景
                StaticStarsView()
                
                ScrollView {
                    VStack(spacing: 25) {
                        // 顶部视觉分隔符（替代被移除的标题）
                        Color.clear
                            .frame(height: 10)
                            .overlay(
                                RoundedRectangle(cornerRadius: 2)
                                    .frame(width: 60, height: 4)
                                    .foregroundColor(Color(red: 0.7, green: 0.3, blue: 0.9))
                                    .opacity(0.6)
                            )
                            .padding(.top, 5)
                        
                        // 核心功能区域
                        VStack(spacing: 15) {
                            SectionHeader(title: "核心功能", subtitle: "探索塔罗的智慧")
                            
                            // 快速占卜卡片
                            NavigationLink(destination: QuickDivinationView()) {
                                optimizedFunctionCard(
                                    icon: "sparkles",
                                    title: "快速占卜",
                                    description: "即时指引",
                                    lastUsed: "2小时前",
                                    color: Color(red: 0.85, green: 0.4, blue: 1.0),
                                    hasAudio: false
                                )
                            }
                            
                            // 每日运势卡片
                            NavigationLink(destination: DailyTopicsView()) {
                                optimizedFunctionCard(
                                    icon: "calendar",
                                    title: "每日运势",
                                    description: "今日能量",
                                    lastUsed: "已解读",
                                    color: Color(red: 0.7, green: 0.3, blue: 0.9),
                                    hasAudio: true
                                )
                            }
                            
                            // 私人定制卡片
                            NavigationLink(destination: PrivateDivinationView()) {
                                optimizedFunctionCard(
                                    icon: "person.fill.viewfinder",
                                    title: "私人定制",
                                    description: "专属占卜",
                                    lastUsed: "最新: 昨天",
                                    color: Color(red: 0.5, green: 0.2, blue: 0.7),
                                    hasAudio: true
                                )
                            }
                        }
                        .padding(.horizontal, 15)
                        
                        // 进阶功能区域
                        advancedFunctionsSection
                            .padding(.horizontal, 20)
                        
                        // 星座占卜区域
                        horoscopeSection
                            .padding(.horizontal, 20)
                        
                        // 塔罗知识库
                        tarotKnowledgeSection
                            .padding(.horizontal, 20)
                        
                        // 精选塔罗教学
                        featuredTarotLessonsSection
                            .padding(.horizontal, 20)
                    }
                    .padding(.bottom, 30)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                // 增强导航栏标题 - 已优化设计
                ToolbarItem(placement: .principal) {
                    VStack(spacing: 4) {
                        // 主标题 - 更大更醒目 (32pt)
                        Text("塔罗宫能")
                            .font(.system(size: 32, weight: .bold, design: .rounded))
                            .foregroundColor(.white)
                            .shadow(color: Color(red: 0.8, green: 0.3, blue: 1.0), radius: 5, x: 0, y: 2)
                            .padding(.top, 5)
                        
                        // 副标题 - 移除背景避免浅白条
                        Text("探索塔罗的智慧")
                            .font(.system(size: 16, weight: .medium))
                            .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                            .opacity(0.9)
                            .padding(.bottom, 5)
                    }
                }
            }
        }
    }
    
    // MARK: - 优化后的功能卡片
    private func optimizedFunctionCard(icon: String, title: String, description: String, lastUsed: String, color: Color, hasAudio: Bool) -> some View {
        HStack(spacing: 15) {
            // 左侧图标区域
            ZStack {
                // 脉动光环
                Circle()
                    .fill(color.opacity(0.2))
                    .frame(width: 70, height: 70)
                
                Circle()
                    .stroke(color, lineWidth: 2)
                    .frame(width: 60, height: 60)
                    .scaleEffect(1.1)
                    .opacity(0.6)
                    .animation(
                        .easeInOut(duration: 1.5)
                        .repeatForever(autoreverses: true),
                        value: UUID()
                    )
                
                Image(systemName: icon)
                    .font(.title)
                    .foregroundColor(.white)
            }
            .padding(.leading, 10)
            
            // 中间文本区域
            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.top, 5)
                
                Text(description)
                    .font(.callout)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                
                // 使用时间指示器
                Text(lastUsed)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .padding(.bottom, 5)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            
            // 右侧指示区域 - 优化布局
            HStack(spacing: 8) {
                // 声波动画放在箭头左侧
                if hasAudio {
                    AudioIndicatorWave()
                        .frame(width: 40, height: 20)
                }
                
                // 导航箭头
                Image(systemName: "chevron.right")
                    .font(.callout)
                    .foregroundColor(.white.opacity(0.7))
            }
            .padding(.trailing, 15)
        }
        .padding(.vertical, 15)
        .frame(maxWidth: .infinity, minHeight: 120)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(color.opacity(0.4), lineWidth: 1)
                )
                .shadow(color: color.opacity(0.5), radius: 10, x: 0, y: 5)
        )
        .overlay(
            // 顶部星光效果
            StarParticlesView()
                .offset(y: -60)
                .opacity(0.6)
        )
        .padding(.vertical, 5)
    }
    
    // MARK: - 声音波纹指示器 (优化版)
    struct AudioIndicatorWave: View {
        @State private var waveHeights: [CGFloat] = [10, 16, 22, 16, 10]
        
        var body: some View {
            HStack(spacing: 3) {
                ForEach(0..<5, id: \.self) { index in
                    RoundedRectangle(cornerRadius: 2)
                        .frame(width: 3, height: waveHeights[index])
                        .foregroundColor(Color(red: 0.8, green: 0.6, blue: 1.0))
                        .animation(
                            .easeInOut(duration: 0.6)
                                .repeatForever(autoreverses: true)
                                .delay(Double(index) * 0.1),
                            value: waveHeights
                        )
                }
            }
            .onAppear {
                withAnimation {
                    waveHeights = [16, 22, 18, 22, 16]
                }
            }
        }
    }
    
    // MARK: - 星光粒子效果
    struct StarParticlesView: View {
        var body: some View {
            ZStack {
                ForEach(0..<8, id: \.self) { _ in
                    Circle()
                        .fill(Color.white)
                        .frame(width: 2, height: 2)
                        .offset(x: CGFloat.random(in: -20...20), y: CGFloat.random(in: -20...20))
                        .opacity(0)
                        .modifier(ParticleAnimation())
                }
            }
        }
    }
    
    struct ParticleAnimation: ViewModifier {
        @State private var isAnimating = false
        
        func body(content: Content) -> some View {
            content
                .scaleEffect(isAnimating ? 1.5 : 0.5)
                .opacity(isAnimating ? 0 : 1)
                .animation(
                    .easeOut(duration: 1.5)
                        .repeatForever(autoreverses: false),
                    value: isAnimating
                )
                .onAppear {
                    isAnimating = true
                }
        }
    }
    
    // MARK: - 进阶功能区域
    private var advancedFunctionsSection: some View {
        VStack(spacing: 20) {
            SectionHeader(title: "进阶功能", subtitle: "深度探索")
            
            LazyVGrid(
                columns: [
                    GridItem(.flexible(), spacing: 15),
                    GridItem(.flexible())
                ],
                spacing: 15
            ) {
                NavigationLink(destination: CardLibraryView()) {
                    advancedFunctionCard(
                        title: "牌阵库",
                        description: "经典牌阵集合",
                        icon: "suit.diamond.fill",
                        color: Color(red: 0.3, green: 0.2, blue: 0.5)
                    )
                }
                
                NavigationLink(destination: ReadingHistoryView()) {
                    advancedFunctionCard(
                        title: "阅读历史",
                        description: "回顾往期占卜",
                        icon: "book.closed.fill",
                        color: Color(red: 0.5, green: 0.3, blue: 0.8)
                    )
                }
                
                NavigationLink(destination: StatsInsightsView()) {
                    advancedFunctionCard(
                        title: "数据洞察",
                        description: "统计与分析",
                        icon: "chart.bar.fill",
                        color: Color(red: 0.7, green: 0.3, blue: 0.6)
                    )
                }
                
                NavigationLink(destination: ReadingHistoryView()) {
                    advancedFunctionCard(
                        title: "能量笔记",
                        description: "记录你的体悟",
                        icon: "note.text",
                        color: Color(red: 0.4, green: 0.3, blue: 0.7)
                    )
                }
            }
        }
    }
    
    private func advancedFunctionCard(title: String, description: String, icon: String, color: Color) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(.white)
                .padding(10)
                .background(Circle().fill(color))
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .fontWeight(.medium)
                    .foregroundColor(.white)
                
                Text(description)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.white.opacity(0.5))
        }
        .padding(15)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 18)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 18)
                .stroke(color.opacity(0.2), lineWidth: 1)
        )
    }
    
    // MARK: - 星座占卜区域
    private var horoscopeSection: some View {
        VStack(spacing: 20) {
            SectionHeader(title: "星座运势", subtitle: "探索你的星空")
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 15) {
                    ForEach(ZodiacSign.allCases, id: \.self) { sign in
                        ZodiacCard(sign: sign)
                    }
                }
                .padding(.horizontal, 5)
            }
        }
    }
    
    private struct ZodiacCard: View {
        let sign: ZodiacSign
        
        var body: some View {
            NavigationLink(destination: HoroscopeView()) {
                VStack(spacing: 8) {
                    Image(systemName: sign.icon)
                        .font(.system(size: 28))
                        .symbolRenderingMode(.multicolor)
                        .foregroundColor(sign.color)
                    
                    Text(sign.name)
                        .font(.caption)
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Capsule().fill(sign.color.opacity(0.2)))
                    
                    Text("\(sign.score)%")
                        .font(.caption2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(5)
                        .frame(width: 45, height: 25)
                        .background(Circle().fill(sign.color.opacity(0.7)))
                }
                .padding(12)
                .frame(width: 100, height: 120)
                .background(
                    RoundedRectangle(cornerRadius: 18)
                        .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 18)
                        .stroke(sign.color.opacity(0.2), lineWidth: 1)
                )
            }
            .buttonStyle(ScaleButtonStyle())
        }
    }
    
    // MARK: - 塔罗知识库
    private var tarotKnowledgeSection: some View {
        VStack(spacing: 20) {
            SectionHeader(title: "塔罗知识库", subtitle: "智慧与传承")
            
            VStack(spacing: 12) {
                tarotKnowledgeCard(
                    title: "塔罗起源",
                    content: "塔罗牌起源于15世纪的意大利，最初作为纸牌游戏使用，后来发展为占卜工具。",
                    icon: "hourglass",
                    color: Color(red: 0.6, green: 0.3, blue: 0.8)
                )
                
                tarotKnowledgeCard(
                    title: "大阿卡纳",
                    content: "22张大阿卡纳牌代表人生的重要课题和精神旅程，每张牌都有深刻的象征意义。",
                    icon: "crown.fill",
                    color: Color(red: 0.5, green: 0.2, blue: 0.7)
                )
                
                tarotKnowledgeCard(
                    title: "牌阵意义",
                    content: "不同的牌阵揭示不同层面的信息，三牌阵适合快速占卜，凯尔特十字适合深度分析。",
                    icon: "square.grid.3x3.fill",
                    color: Color(red: 0.4, green: 0.1, blue: 0.6)
                )
            }
        }
    }
    
    private func tarotKnowledgeCard(title: String, content: String, icon: String, color: Color) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title)
                .foregroundColor(.white)
                .padding(12)
                .background(Circle().fill(color))
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text(content)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .fixedSize(horizontal: false, vertical: true)
            }
        }
        .padding(15)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 18)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 18)
                .stroke(color.opacity(0.3), lineWidth: 1)
        )
    }
    
    // MARK: - 精选塔罗教学
    private var featuredTarotLessonsSection: some View {
        VStack(spacing: 20) {
            SectionHeader(title: "塔罗教学", subtitle: "精选课程")
            
            VStack(spacing: 15) {
                // 大班轮播图
                TabView {
                    ForEach(1...3, id: \.self) { index in
                        featuredLessonCard(index: index)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .never))
                .frame(height: 150)
                
                // 小班课程链接
                HStack(spacing: 20) {
                    featuredSmallLesson(title: "大阿卡纳", symbol: "moon.stars.fill")
                    featuredSmallLesson(title: "小阿卡纳", symbol: "sparkles")
                    featuredSmallLesson(title: "牌阵指南", symbol: "square.stack.3d.down.right.fill")
                }
            }
            .padding(15)
            .background(
                RoundedRectangle(cornerRadius: 18)
                    .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 18)
                    .stroke(Color(red: 0.5, green: 0.2, blue: 0.7).opacity(0.3), lineWidth: 1)
            )
        }
    }
    
    private func featuredLessonCard(index: Int) -> some View {
        let colors: [Color] = [
            Color(red: 0.6, green: 0.3, blue: 0.8),
            Color(red: 0.5, green: 0.2, blue: 0.7),
            Color(red: 0.4, green: 0.1, blue: 0.6)
        ]
        
        return VStack {
            HStack {
                VStack(alignment: .leading, spacing: 6) {
                    Text("第 \(index) 课：塔罗基础入门")
                        .font(.callout)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.top, 5)
                    
                    Text("学习正逆位含义与象征")
                        .font(.caption)
                        .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    
                    Spacer()
                    
                    HStack {
                        Image(systemName: "clock")
                        Text("25分钟")
                            .font(.caption2)
                    }
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .padding(.bottom, 5)
                }
                
                Spacer()
                
                Image(systemName: "play.circle.fill")
                    .font(.system(size: 40))
                    .foregroundColor(.white)
            }
            .padding(15)
        }
        .frame(maxWidth: .infinity)
        .background(colors[index % colors.count].opacity(0.9))
        .cornerRadius(15)
        .padding(.horizontal, 15)
    }
    
    private func featuredSmallLesson(title: String, symbol: String) -> some View {
        NavigationLink(destination: TarotTutorialView()) {
            VStack {
                Image(systemName: symbol)
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding(8)
                    .background(Circle().fill(Color(red: 0.5, green: 0.2, blue: 0.7)))
                
                Text(title)
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .multilineTextAlignment(.center)
                    .lineLimit(1)
            }
            .frame(maxWidth: .infinity)
        }
    }
}

// MARK: - 自定义视图组件

struct SectionHeader: View {
    var title: String
    var subtitle: String
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .opacity(0.8)
            }
            
            Spacer()
        }
    }
}

struct ScaleButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.97 : 1.0)
            .opacity(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeOut(duration: 0.15), value: configuration.isPressed)
    }
}

// MARK: - 静态星空背景

struct StaticStarsView: View {
    var body: some View {
        GeometryReader { geometry in
            // 防止 size 为 zero 导致随机范围为空
            let width  = max(geometry.size.width,  1)
            let height = max(geometry.size.height, 1)
            
            ZStack {
                ForEach(0..<60, id: \.self) { _ in
                    let x       = CGFloat.random(in: 0...width)
                    let y       = CGFloat.random(in: 0...height)
                    let dotSize = CGFloat.random(in: 0.5...2)
                    let alpha   = Double.random(in: 0.1...0.6)
                    
                    Circle()
                        .fill(Color.white)
                        .opacity(alpha)
                        .frame(width: dotSize, height: dotSize)
                        .position(x: x, y: y)
                }
            }
        }
    }
}

// MARK: - 模型与枚举

enum ZodiacSign: String, CaseIterable {
    case aries = "白羊"
    case taurus = "金牛"
    case gemini = "双子"
    case cancer = "巨蟹"
    case leo = "狮子"
    case virgo = "处女"
    case libra = "天秤"
    case scorpio = "天蝎"
    case sagittarius = "射手"
    case capricorn = "摩羯"
    case aquarius = "水瓶"
    case pisces = "双鱼"
    
    var icon: String {
        switch self {
        case .aries: return "hare.fill"
        case .taurus: return "leaf.fill"
        case .gemini: return "cloud.fog.fill"
        case .cancer: return "water.waves"
        case .leo: return "sun.max.fill"
        case .virgo: return "drop.fill"
        case .libra: return "scales"
        case .scorpio: return "scorpion"
        case .sagittarius: return "figure.archery"
        case .capricorn: return "mountain.2.fill"
        case .aquarius: return "wind"
        case .pisces: return "fish.fill"
        }
    }
    
    var color: Color {
        switch self {
        case .aries: return .red
        case .taurus: return .green
        case .gemini: return .yellow
        case .cancer: return .blue
        case .leo: return .orange
        case .virgo: return .teal
        case .libra: return .pink
        case .scorpio: return .purple
        case .sagittarius: return .indigo
        case .capricorn: return .brown
        case .aquarius: return .cyan
        case .pisces: return .mint
        }
    }
    
    var name: String { rawValue }
    var score: Int { Int.random(in: 50...95) }
}

// MARK: - 预览 (仅支持 iPhone 16 Pro)

struct TarotEnergyView_Previews: PreviewProvider {
    static var previews: some View {
        TarotEnergyView()
            .preferredColorScheme(.dark)
            .previewDevice("iPhone 16 Pro")
    }
}
