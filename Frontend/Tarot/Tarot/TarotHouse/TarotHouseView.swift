import SwiftUI

// MARK: - 星空背景 (避免与其它文件重复命名)
struct StarFieldBackground: View {
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                ForEach(0..<60, id: \.self) { _ in
                    let x = CGFloat.random(in: 0...geometry.size.width)
                    let y = CGFloat.random(in: 0...geometry.size.height)
                    let size = CGFloat.random(in: 0.5..<2)
                    let opacity = Double.random(in: 0.1..<0.6)

                    Circle()
                        .fill(Color.white)
                        .opacity(opacity)
                        .frame(width: size, height: size)
                        .position(x: x, y: y)
                }
            }
        }
    }
}

// MARK: - 会员功能枚举
enum MembershipFeature: CaseIterable {
    case weeklyHoroscope
    case dailyHoroscope
    case quickDivination
    case dailyTopics
    case personalizedDivination

    var id: Int {
        switch self {
        case .weeklyHoroscope: return 0
        case .dailyHoroscope: return 1
        case .quickDivination: return 2
        case .dailyTopics: return 3
        case .personalizedDivination: return 4
        }
    }

    var title: String {
        switch self {
        case .weeklyHoroscope: return "星座周报"
        case .dailyHoroscope: return "星座日报"
        case .quickDivination: return "快速占卜"
        case .dailyTopics: return "每日话题"
        case .personalizedDivination: return "个性化占卜"
        }
    }

    /// 基础版显示：有次数的用数字，没有的用 ✓/✗
    var basicDescription: String {
        switch self {
        case .quickDivination:         return "35次"
        case .dailyTopics:             return "12次"
        case .personalizedDivination:  return "8次"
        default:                       return basicIncluded ? "✓" : "✗"
        }
    }

    /// 高级版显示：有次数的用数字，没有的用 ✓/✗
    var premiumDescription: String {
        switch self {
        case .quickDivination:         return "80次"
        case .dailyTopics:             return "30次"
        case .personalizedDivination:  return "18次"
        default:                       return premiumIncluded ? "✓" : "✗"
        }
    }

    /// 基础版是否包含
    var basicIncluded: Bool {
        switch self {
        case .weeklyHoroscope: return true
        case .dailyHoroscope:  return false
        case .quickDivination: return true
        case .dailyTopics:     return true
        case .personalizedDivination: return true
        }
    }

    /// 高级版是否包含（这里假设全部都包含）
    var premiumIncluded: Bool { true }
}

// MARK: - 主视图
struct TarotHouseView: View {

    // —— 星月神话奖池预览用图片名称列表 —— //
    private let featuredCardImages = [
        "Timage6", "Timage7", "Timage8", "Timage9", "Timage10"
    ]

    // —— 状态变量 —— //
    @State private var selectedTab = 0    // 0: 会员, 1: 奖池, 2: 背包, 3: 充值
    @State private var showGachaAnimation = false
    @State private var gachaResult: GachaResult?
    @State private var userCurrency = 1280
    @State private var userTickets = 5

    var body: some View {
        NavigationStack {
            ZStack {
                // 深紫色渐变背景
                LinearGradient(
                    gradient: Gradient(colors: [
                        Color(red: 0.15, green: 0.05, blue: 0.25),
                        Color(red: 0.25, green: 0.10, blue: 0.40)
                    ]),
                    startPoint: .top,
                    endPoint: .bottom
                )
                .ignoresSafeArea()

                // 星空背景
                StarFieldBackground()

                // 主内容
                VStack(spacing: 0) {
                    resourceBar
                    tabSelector

                    TabView(selection: $selectedTab) {
                        membershipSection.tag(0)
                        gachaPoolsSection.tag(1)
                        backpackSection.tag(2)
                        rechargeSection.tag(3)
                    }
                    .tabViewStyle(.page(indexDisplayMode: .never))
                }

                // 抽奖动画浮层
                if showGachaAnimation {
                    GachaAnimationView(
                        result: $gachaResult,
                        isPresented: $showGachaAnimation
                    )
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("塔罗屋")
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                }
            }
        }
    }

    // MARK: - 顶部资源栏
    private var resourceBar: some View {
        HStack {
            // 钻石
            HStack(spacing: 8) {
                Image(systemName: "diamond.fill")
                    .foregroundColor(Color(red: 0.8, green: 0.9, blue: 1.0))
                Text("\(userCurrency)")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Capsule().fill(Color(red: 0.30, green: 0.20, blue: 0.50)))

            Spacer()

            // 抽奖券
            HStack(spacing: 8) {
                Image(systemName: "ticket.fill")
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                Text("\(userTickets)")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Capsule().fill(Color(red: 0.40, green: 0.20, blue: 0.60)))
        }
        .padding(.horizontal, 20)
        .padding(.top, 15)
        .padding(.bottom, 10)
    }

    // MARK: - 标签选择器
    private var tabSelector: some View {
        HStack(spacing: 0) {
            TabButton(title: "会员",    isSelected: selectedTab == 0) { selectedTab = 0 }
            TabButton(title: "奖池",    isSelected: selectedTab == 1) { selectedTab = 1 }
            TabButton(title: "背包",    isSelected: selectedTab == 2) { selectedTab = 2 }
            TabButton(title: "充值",    isSelected: selectedTab == 3) { selectedTab = 3 }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 15)
    }

    // MARK: - 会员区域
    private var membershipSection: some View {
        ScrollView {
            VStack(spacing: 30) {
                Text("塔罗会员")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.top, 20)

                Text("解锁更多神秘力量")
                    .font(.title3)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .padding(.bottom, 20)

                membershipComparisonSection

                HStack(spacing: 20) {
                    basicMembershipCard
                    premiumMembershipCard
                }
                .padding(.horizontal, 20)

                faqSection
                    .padding(.horizontal, 20)
                    .padding(.top, 30)
            }
            .padding(.bottom, 50)
        }
    }

    // MARK: - 会员套餐对比表
    private var membershipComparisonSection: some View {
        VStack(spacing: 0) {
            // 表头
            HStack {
                Text("会员权益")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                Text("基础版")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(width: 120)
                
                Text("高级版")
                    .font(.headline)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                    .frame(width: 120)
            }
            .padding(15)
            .background(Color(red: 0.2, green: 0.1, blue: 0.35))
            
            // 对比行
            ForEach(MembershipFeature.allCases, id: \.self) { feature in
                HStack {
                    Text(feature.title)
                        .font(.subheadline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    
                    // 基础版：显示次数或“✓/✗”
                    Text(feature.basicDescription)
                        .font(.subheadline)
                        .foregroundColor(.white)
                        .frame(width: 120)
                    
                    // 高级版：显示次数或“✓/✗”
                    Text(feature.premiumDescription)
                        .font(.subheadline)
                        .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                        .frame(width: 120)
                }
                .padding(15)
                .background(
                    Color(red: 0.15, green: 0.07, blue: 0.3)
                        .opacity(feature.id % 2 == 0 ? 1.0 : 0.8)
                )
            }
            
            // 价格行
            HStack {
                Text("价格")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                
                Text("¥14.99/月")
                    .font(.headline)
                    .foregroundColor(.white)
                    .frame(width: 120)
                
                Text("¥24.99/月")
                    .font(.headline)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                    .frame(width: 120)
            }
            .padding(15)
            .background(Color(red: 0.2, green: 0.1, blue: 0.35))
        }
        .cornerRadius(15)
        .overlay(
            RoundedRectangle(cornerRadius: 15)
                .stroke(Color(red: 0.5, green: 0.2, blue: 0.7), lineWidth: 1)
        )
        .padding(.horizontal, 20)
    }
    
    // MARK: - 基础会员卡片
    private var basicMembershipCard: some View {
        VStack(spacing: 15) {
            VStack {
                Text("基础版")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                Text("¥14.99/月")
                    .font(.title3)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
            }
            .padding(.top, 20)

            VStack(alignment: .leading, spacing: 12) {
                ForEach(
                    MembershipFeature.allCases.filter { $0.basicIncluded },
                    id: \.self
                ) { feature in
                    HStack(spacing: 10) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                        Text(feature.title)
                            .font(.subheadline)
                            .foregroundColor(.white)
                    }
                }
            }
            .padding(.horizontal, 15)

            Spacer()

            Button(action: {
                // 开通基础会员逻辑
            }) {
                Text("立即开通")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 15)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color(red: 0.4, green: 0.1, blue: 0.6))
                    )
            }
            .padding(.bottom, 20)
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 0.5, green: 0.2, blue: 0.7), lineWidth: 2)
        )
    }

    // MARK: - 高级会员卡片
    private var premiumMembershipCard: some View {
        VStack(spacing: 15) {
            VStack {
                Text("高级版")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                Text("¥24.99/月")
                    .font(.title3)
                    .foregroundColor(Color(red: 1.0, green: 0.9, blue: 0.5))
            }
            .padding(.top, 20)

            Text("最受欢迎")
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.horizontal, 12)
                .padding(.vertical, 4)
                .background(
                    Capsule()
                        .fill(Color(red: 0.9, green: 0.5, blue: 0.3))
                )

            VStack(alignment: .leading, spacing: 12) {
                ForEach(MembershipFeature.allCases, id: \.self) { feature in
                    HStack(spacing: 10) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                        Text(feature.title)
                            .font(.subheadline)
                            .foregroundColor(.white)
                    }
                }
            }
            .padding(.horizontal, 15)

            Spacer()

            Button(action: {
                // 开通高级会员逻辑
            }) {
                Text("立即开通")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 15)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color(red: 1.0, green: 0.8, blue: 0.3))
                    )
            }
            .padding(.bottom, 20)
            .padding(.horizontal, 20)
        }
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 1.0, green: 0.8, blue: 0.3), lineWidth: 2)
        )
        .shadow(color: Color(red: 1.0, green: 0.8, blue: 0.3).opacity(0.5),
                radius: 10, x: 0, y: 5)
    }

    // MARK: - 常见问题
    private var faqSection: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("常见问题")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.bottom, 10)

            VStack(spacing: 15) {
                faqItem(
                    question: "会员可以随时取消吗？",
                    answer: "是的，您可以随时在账号设置中取消会员订阅，取消后将在当前计费周期结束后失效。"
                )
                faqItem(
                    question: "会员费用如何支付？",
                    answer: "我们支持多种支付方式，包括Apple Pay、支付宝、微信支付和信用卡支付。"
                )
                faqItem(
                    question: "会员特权如何生效？",
                    answer: "会员特权将在支付成功后立即生效，您可以在会员中心查看您的会员状态和剩余次数。"
                )
                faqItem(
                    question: "会员可以升级或降级吗？",
                    answer: "是的，您可以随时在账号设置中升级或降级您的会员套餐，变更将在下一个计费周期生效。"
                )
            }
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 0.5, green: 0.2, blue: 0.7), lineWidth: 1)
        )
    }

    private func faqItem(question: String, answer: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Text(question)
                    .font(.headline)
                    .foregroundColor(.white)
                Spacer()
                Image(systemName: "chevron.down")
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
            }
            Text(answer)
                .font(.subheadline)
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(15)
        .background(
            RoundedRectangle(cornerRadius: 15)
                .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
        )
    }

    // MARK: - 奖池区域
    private var gachaPoolsSection: some View {
        ScrollView {
            VStack(spacing: 25) {
                limitedTimeBanner

                Text("精选奖池")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)

                featuredGachaPool

                Text("其他奖池")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)

                LazyVGrid(
                    columns: [GridItem(.flexible()), GridItem(.flexible())],
                    spacing: 20
                ) {
                    ForEach(GachaPool.samplePools, id: \.id) { pool in
                        gachaPoolCard(pool: pool)
                    }
                }
                .padding(.horizontal, 20)
            }
            .padding(.bottom, 30)
        }
    }

    // MARK: - 限时活动横幅
    private var limitedTimeBanner: some View {
        ZStack(alignment: .bottomLeading) {
            Image("StarMoonMythBanner")
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(height: 180)
                .clipped()
                .cornerRadius(20)
                .overlay(
                    RoundedRectangle(cornerRadius: 20)
                        .stroke(Color(red: 0.8, green: 0.5, blue: 1.0), lineWidth: 2)
                )
                .padding(.horizontal, 20)

            VStack(alignment: .leading, spacing: 5) {
                Text("限时活动")
                    .font(.caption)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Capsule().fill(Color(red: 0.9, green: 0.3, blue: 0.3)))

                Text("星月神话奖池")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .shadow(color: .black, radius: 2)

                Text("获取限定塔罗皮肤")
                    .font(.subheadline)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .shadow(color: .black, radius: 2)

                HStack {
                    Image(systemName: "clock")
                    Text("剩余: 3天12小时")
                        .font(.caption)
                        .foregroundColor(.white)
                        .shadow(color: .black, radius: 2)
                }
            }
            .padding(20)
        }
    }

    // MARK: - 精选奖池卡片
    private var featuredGachaPool: some View {
        VStack(alignment: .leading, spacing: 15) {
            HStack {
                Text("星月神话")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)

                Spacer()

                HStack(spacing: 5) {
                    Image(systemName: "star.fill")
                        .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                    Text("SSR概率提升")
                        .font(.subheadline)
                        .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                }
            }

            Text("收集星空主题塔罗牌，解锁神秘力量")
                .font(.subheadline)
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))

            // 横向滚动展示用户图片
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 15) {
                    ForEach(featuredCardImages, id: \.self) { imageName in
                        featuredCardPreview(imageName: imageName)
                    }
                }
                .padding(.horizontal, 5)
            }

            HStack {
                Button(action: { startGacha(type: .single) }) {
                    HStack { Image(systemName: "sparkles"); Text("单抽 (1券)") }
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.vertical, 12)
                        .padding(.horizontal, 25)
                        .background(RoundedRectangle(cornerRadius: 25)
                            .fill(Color(red: 0.5, green: 0.2, blue: 0.7)))
                }

                Spacer()

                Button(action: { startGacha(type: .multi) }) {
                    HStack { Image(systemName: "sparkles"); Text("十连抽 (10券)") }
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.vertical, 12)
                        .padding(.horizontal, 25)
                        .background(RoundedRectangle(cornerRadius: 25)
                            .fill(Color(red: 0.7, green: 0.3, blue: 0.9)))
                }
            }
            .padding(.top, 10)
        }
        .padding(20)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 0.6, green: 0.3, blue: 0.8), lineWidth: 1)
        )
        .padding(.horizontal, 20)
    }

    // MARK: - 单张卡片预览
    private func featuredCardPreview(imageName: String) -> some View {
        VStack {
            Image(imageName)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 100, height: 150)
                .clipped()
                .cornerRadius(15)
            Text(imageName)
                .font(.caption)
                .foregroundColor(.white)
                .lineLimit(1)
        }
    }

    // MARK: - 奖池列表卡片
    private func gachaPoolCard(pool: GachaPool) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 15)
                    .fill(
                        LinearGradient(
                            colors: pool.gradientColors,
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(height: 120)

                VStack {
                    Text(pool.name)
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Capsule().fill(Color.black.opacity(0.4)))

                    Text(pool.description)
                        .font(.caption)
                        .foregroundColor(.white)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 10)
                }
            }

            HStack {
                Text("\(pool.costPerPull)券/抽")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                Spacer()
                Button(action: {}) {
                    Text("前往")
                        .font(.caption)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.horizontal, 15)
                        .padding(.vertical, 5)
                        .background(Capsule()
                            .fill(Color(red: 0.5, green: 0.2, blue: 0.7)))
                }
            }
        }
        .padding(15)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 0.5, green: 0.2, blue: 0.7).opacity(0.3),
                        lineWidth: 1)
        )
    }

    // MARK: - 背包区域
    private var backpackSection: some View {
        ScrollView {
            VStack(spacing: 25) {
                filterOptions
                LazyVGrid(
                    columns: [
                        GridItem(.flexible(), spacing: 15),
                        GridItem(.flexible()),
                        GridItem(.flexible())
                    ],
                    spacing: 15
                ) {
                    ForEach(1...12, id: \.self) { index in
                        tarotCardItem(index: index)
                    }
                }
                .padding(.horizontal, 20)
            }
            .padding(.bottom, 30)
        }
    }

    private var filterOptions: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 15) {
                filterButton("全部", color: .white)
                filterButton("SSR", color: Color(red: 0.9, green: 0.5, blue: 0.3))
                filterButton("SR",  color: Color(red: 0.3, green: 0.5, blue: 0.9))
                filterButton("R",   color: Color(red: 0.3, green: 0.7, blue: 0.3))
                filterButton("N",   color: Color(red: 0.6, green: 0.6, blue: 0.6))
            }
            .padding(.horizontal, 20)
        }
    }

    private func filterButton(_ title: String, color: Color) -> some View {
        Button(action: {}) {
            Text(title)
                .font(.subheadline)
                .foregroundColor(color)
                .padding(.horizontal, 20)
                .padding(.vertical, 8)
                .background(
                    Capsule()
                        .fill(color.opacity(title == "全部" ? 1.0 : 0.2))
                )
        }
    }

    private func tarotCardItem(index: Int) -> some View {
        let rarityColors: [Color] = [
            Color(red: 0.6, green: 0.6, blue: 0.6),
            Color(red: 0.3, green: 0.7, blue: 0.3),
            Color(red: 0.3, green: 0.5, blue: 0.9),
            Color(red: 0.9, green: 0.5, blue: 0.3)
        ]
        let rarityIndex = [0,1,2,3,0,1,2,3,0,1,2,3][index - 1]
        let rarity = ["N","R","SR","SSR"][rarityIndex]

        return VStack {
            RoundedRectangle(cornerRadius: 12)
                .fill(rarityColors[rarityIndex])
                .frame(height: 120)
                .overlay(
                    Image(systemName: "questionmark")
                        .font(.title)
                        .foregroundColor(.white)
                )

            Text("塔罗牌 #\(index)")
                .font(.caption)
                .foregroundColor(.white)
                .lineLimit(1)

            Text(rarity)
                .font(.caption2)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.horizontal, 10)
                .padding(.vertical, 3)
                .background(
                    Capsule()
                        .fill(rarityColors[rarityIndex].opacity(0.8))
                )
        }
    }

    // MARK: - 充值区域
    private var rechargeSection: some View {
        ScrollView {
            VStack(spacing: 25) {
                Text("选择充值套餐")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)

                LazyVGrid(
                    columns: [GridItem(.flexible()), GridItem(.flexible())],
                    spacing: 20
                ) {
                    ForEach(RechargePackage.samplePackages, id: \.id) { pkg in
                        rechargePackageCard(package: pkg)
                    }
                }
                .padding(.horizontal, 20)

                Text("支付方式")
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)

                paymentMethods
                    .padding(.horizontal, 20)
            }
            .padding(.bottom, 30)
        }
    }

    private func rechargePackageCard(package: RechargePackage) -> some View {
        VStack(spacing: 10) {
            Text(package.name)
                .font(.headline)
                .fontWeight(.bold)
                .foregroundColor(.white)

            HStack(alignment: .firstTextBaseline, spacing: 2) {
                Text("¥")
                    .font(.subheadline)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                Text("\(package.price)")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
            }

            HStack(spacing: 5) {
                Image(systemName: "diamond.fill")
                    .foregroundColor(Color(red: 0.8, green: 0.9, blue: 1.0))
                Text("\(package.diamonds)")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }

            if package.bonus > 0 {
                Text("额外赠送 \(package.bonus)")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.3, green: 0.7, blue: 0.3))
                    .padding(.horizontal, 10)
                    .padding(.vertical, 3)
                    .background(
                        Capsule()
                            .fill(Color(red: 0.3, green: 0.7, blue: 0.3).opacity(0.2))
                    )
            }

            Button(action: {}) {
                Text("立即充值")
                    .font(.subheadline)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .padding(.vertical, 8)
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color(red: 0.5, green: 0.2, blue: 0.7))
                    )
            }
            .padding(.top, 5)
        }
        .padding(15)
        .background(
            RoundedRectangle(cornerRadius: 20)
                .fill(Color(red: 0.15, green: 0.07, blue: 0.3))
        )
        .overlay(
            RoundedRectangle(cornerRadius: 20)
                .stroke(Color(red: 0.5, green: 0.2, blue: 0.7).opacity(0.3),
                        lineWidth: 1)
        )
    }

    private var paymentMethods: some View {
        VStack(spacing: 15) {
            paymentRow(icon: "applelogo", title: "Apple Pay", checked: true)
            paymentRow(icon: "creditcard.fill", title: "银行卡支付")
            paymentRow(icon: "wonsign.circle.fill", title: "支付宝")
            paymentRow(icon: "qrcode", title: "微信支付")
        }
    }

    private func paymentRow(icon: String, title: String, checked: Bool = false) -> some View {
        HStack {
            Image(systemName: icon)
                .font(.title)
                .foregroundColor(.white)
            Text(title)
                .font(.headline)
                .foregroundColor(.white)
            Spacer()
            if checked {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundColor(.green)
            } else {
                Image(systemName: "chevron.right")
                    .foregroundColor(.gray)
            }
        }
        .padding(15)
        .background(
            RoundedRectangle(cornerRadius: 15)
                .fill(Color(red: 0.2, green: 0.1, blue: 0.4))
        )
    }

    // MARK: - 抽奖逻辑
    private func startGacha(type: GachaType) {
        let cost = (type == .single) ? 1 : 10
        guard userTickets >= cost else { return }
        userTickets -= cost

        var results = [GachaResult]()
        for _ in 0..<(type == .single ? 1 : 10) {
            let rarity = determineRarity()
            results.append(GachaResult(
                rarity: rarity,
                cardName: "塔罗牌 #\(Int.random(in: 1...100))"
            ))
        }
        gachaResult = results.first
        showGachaAnimation = true
    }

    private func determineRarity() -> Rarity {
        let r = Double.random(in: 0...1)
        switch r {
        case 0..<0.01: return .ssr
        case 0.01..<0.1: return .sr
        case 0.1..<0.4:  return .r
        default:         return .n
        }
    }
}

// MARK: - 抽奖动画视图
struct GachaAnimationView: View {
    @Binding var result: GachaResult?
    @Binding var isPresented: Bool
    @State private var animationProgress: CGFloat = 0

    var body: some View {
        ZStack {
            Color.black.opacity(0.7)
                .edgesIgnoringSafeArea(.all)

            VStack {
                Spacer()

                if animationProgress < 0.5 {
                    VStack {
                        Image(systemName: "sparkles")
                            .font(.system(size: 100))
                            .symbolEffect(.bounce, options: .repeating, value: animationProgress)
                            .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                        Text("神秘力量汇聚中...")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.top, 20)
                    }
                    .transition(.opacity)
                } else {
                    if let result = result {
                        VStack(spacing: 20) {
                            Text(result.rarity.displayName)
                                .font(.largeTitle)
                                .fontWeight(.bold)
                                .foregroundColor(result.rarity.color)
                                .shadow(color: result.rarity.color.opacity(0.5), radius: 10)

                            ZStack {
                                RoundedRectangle(cornerRadius: 20)
                                    .fill(result.rarity.color)
                                    .frame(width: 200, height: 300)
                                    .shadow(color: result.rarity.color.opacity(0.8), radius: 20)

                                VStack {
                                    Image(systemName: "questionmark")
                                        .font(.system(size: 80))
                                        .foregroundColor(.white)
                                    Text(result.cardName)
                                        .font(.title2)
                                        .fontWeight(.bold)
                                        .foregroundColor(.white)
                                        .padding(.top, 10)
                                }
                            }

                            Button(action: {
                                withAnimation {
                                    isPresented = false
                                }
                            }) {
                                Text("确认")
                                    .font(.headline)
                                    .fontWeight(.bold)
                                    .foregroundColor(.white)
                                    .padding(.horizontal, 40)
                                    .padding(.vertical, 12)
                                    .background(
                                        RoundedRectangle(cornerRadius: 25)
                                            .fill(Color(red: 0.5, green: 0.2, blue: 0.7))
                                    )
                            }
                            .padding(.top, 20)
                        }
                        .transition(.scale.combined(with: .opacity))
                    }
                }

                Spacer()
            }
        }
        .onAppear {
            withAnimation(.easeInOut(duration: 1.5)) {
                animationProgress = 1.0
            }
        }
    }
}

// MARK: - 数据模型

struct GachaPool: Identifiable {
    let id = UUID()
    let name: String
    let description: String
    let costPerPull: Int
    let gradientColors: [Color]

    static let samplePools: [GachaPool] = [
        .init(
            name: "经典塔罗",
            description: "传统塔罗牌设计",
            costPerPull: 1,
            gradientColors: [
                Color(red: 0.4, green: 0.2, blue: 0.6),
                Color(red: 0.6, green: 0.3, blue: 0.8)
            ]
        ),
        .init(
            name: "暗夜魅影",
            description: "暗黑风格塔罗牌",
            costPerPull: 1,
            gradientColors: [
                Color(red: 0.2, green: 0.1, blue: 0.3),
                Color(red: 0.4, green: 0.1, blue: 0.5)
            ]
        ),
        .init(
            name: "晨曦之光",
            description: "明亮清新风格",
            costPerPull: 1,
            gradientColors: [
                Color(red: 0.3, green: 0.5, blue: 0.9),
                Color(red: 0.5, green: 0.7, blue: 1.0)
            ]
        ),
        .init(
            name: "神话传说",
            description: "神话主题塔罗牌",
            costPerPull: 2,
            gradientColors: [
                Color(red: 0.8, green: 0.4, blue: 0.2),
                Color(red: 1.0, green: 0.6, blue: 0.3)
            ]
        )
    ]
}

enum GachaType {
    case single
    case multi
}

enum Rarity: String {
    case n = "N"
    case r = "R"
    case sr = "SR"
    case ssr = "SSR"

    var displayName: String { rawValue }
    var color: Color {
        switch self {
        case .n:  return Color(red: 0.6, green: 0.6, blue: 0.6)
        case .r:  return Color(red: 0.3, green: 0.7, blue: 0.3)
        case .sr: return Color(red: 0.3, green: 0.5, blue: 0.9)
        case .ssr:return Color(red: 0.9, green: 0.5, blue: 0.3)
        }
    }
}

struct GachaResult {
    let rarity: Rarity
    let cardName: String
}

struct RechargePackage: Identifiable {
    let id = UUID()
    let name: String
    let price: Int
    let diamonds: Int
    let bonus: Int

    static let samplePackages: [RechargePackage] = [
        .init(name: "新手礼包", price: 6,   diamonds: 60,   bonus: 6),
        .init(name: "小资套餐", price: 30,  diamonds: 300,  bonus: 30),
        .init(name: "豪华礼包", price: 98,  diamonds: 980,  bonus: 150),
        .init(name: "尊享礼包", price: 198, diamonds: 1980, bonus: 400),
        .init(name: "星月特权", price: 328, diamonds: 3280, bonus: 800),
        .init(name: "至尊特权", price: 648, diamonds: 6480, bonus: 1600)
    ]
}

// MARK: - 自定义 TabButton
private struct TabButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 5) {
                Text(title)
                    .font(.headline)
                    .fontWeight(.medium)
                    .foregroundColor(
                        isSelected
                        ? .white
                        : Color(red: 0.8, green: 0.7, blue: 1.0)
                    )
                if isSelected {
                    Capsule()
                        .fill(Color(red: 0.8, green: 0.5, blue: 1.0))
                        .frame(height: 3)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 10)
            .contentShape(Rectangle())
        }
    }
}

// MARK: - 预览
struct TarotHouseView_Previews: PreviewProvider {
    static var previews: some View {
        TarotHouseView()
            .preferredColorScheme(.dark)
    }
}
