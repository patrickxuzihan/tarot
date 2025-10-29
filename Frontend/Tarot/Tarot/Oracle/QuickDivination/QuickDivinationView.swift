//
//  QuickDivinationView.swift (修复版本)
//  Tarot
//
//  问题: 悬浮窗占据整个屏幕
//  解决方案: 正确设置 frame 和 overlay

import SwiftUI

struct QuickDivinationView: View {
    // 聊天信息模型
    struct Message: Identifiable {
        let id = UUID()
        let content: String
        let isUser: Bool
    }
    
    // MARK: - 状态管理
    @State private var messages: [Message] = []
    @State private var inputText = ""
    @State private var isTyping = false
    @State private var sentCount = 0
    
    // ✅ 添加悬浮窗控制状态
    @State private var showTarotCard = false
    @State private var drawnCard: String? = nil  // 抽到的塔罗牌
    
    // 深色风格配置
    private let backgroundColor = LinearGradient(
        gradient: Gradient(colors: [
            Color(red: 0.15, green: 0.05, blue: 0.25),
            Color(red: 0.25, green: 0.1, blue: 0.4)
        ]),
        startPoint: .top,
        endPoint: .bottom
    )
    
    // DeepSeek R1 模型与 API Key
    private let apiKey = "sk-04fc80568ef94b909fae278a5cd24475"
    private let modelName = "deepseek-reasoner"
    private let endpointURL = URL(string: "https://api.deepseek.com/v1/chat/completions")!
    
    private let systemPrompt = """
    你是一位塔罗解读师,用最口语化的方式给出不超过600字的指引。
    1. 请先"模拟抽三张塔罗牌",然后结合正逆位说一两句。
    2. 不要出现"AI"、"模型"之类词汇。
    3. 不只是解读牌,还要给个实际例子,比如"比如你在职场…",让建议更贴地气。
    4. 结尾保持一句行动建议即可。
    """
    
    var body: some View {
        NavigationStack {
            ZStack {
                backgroundColor
                    .edgesIgnoringSafeArea(.all)
                
                VStack(spacing: 0) {
                    // 聊天消息区
                    ScrollViewReader { scrollProxy in
                        ScrollView {
                            VStack(spacing: 15) {
                                welcomeSection
                                    .padding(.top, 20)
                                    .padding(.bottom, 15)
                                
                                ForEach(messages) { message in
                                    chatMessageView(message: message)
                                }
                                
                                if isTyping {
                                    typingIndicator
                                }
                                
                                Spacer().frame(height: 30)
                            }
                            .padding(.horizontal, 10)
                            .id("Bottom")
                        }
                        .onChange(of: messages.count) { _ in
                            withAnimation {
                                scrollProxy.scrollTo("Bottom", anchor: .bottom)
                            }
                        }
                    }
                    
                    if sentCount >= 2 {
                        Text("本轮占卜次数已用完")
                            .font(.footnote)
                            .foregroundColor(.red)
                            .padding(.bottom, 4)
                    }
                    
                    chatInputView
                }
                
                // ✅ 正确的悬浮窗实现
                if showTarotCard {
                    tarotCardOverlay
                }
            }
            .navigationBarTitle("塔罗占卜", displayMode: .inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    HStack {
                        Image(systemName: "moon.stars.fill")
                            .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                        Text("快速占卜")
                            .font(.subheadline)
                            .foregroundColor(.white)
                    }
                }
            }
            .onAppear {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    messages.append(Message(
                        content: "欢迎来到塔罗占卜🔮\n请描述您的困惑或问题。",
                        isUser: false
                    ))
                }
            }
        }
        .preferredColorScheme(.dark)
    }
    
    // MARK: - ✅ 修复后的悬浮窗视图
    private var tarotCardOverlay: some View {
        ZStack {
            // 半透明背景遮罩 - 点击可关闭
            Color.black.opacity(0.6)
                .edgesIgnoringSafeArea(.all)
                .onTapGesture {
                    withAnimation(.spring()) {
                        showTarotCard = false
                    }
                }
            
            // ✅ 悬浮卡片 - 关键是这里要设置具体的尺寸
            VStack(spacing: 20) {
                // 关闭按钮
                HStack {
                    Spacer()
                    Button(action: {
                        withAnimation(.spring()) {
                            showTarotCard = false
                        }
                    }) {
                        Image(systemName: "xmark.circle.fill")
                            .font(.system(size: 28))
                            .foregroundColor(.white.opacity(0.8))
                    }
                }
                
                // 塔罗牌展示
                ZStack {
                    RoundedRectangle(cornerRadius: 20)
                        .fill(
                            LinearGradient(
                                colors: [
                                    Color(red: 0.6, green: 0.3, blue: 0.8),
                                    Color(red: 0.4, green: 0.2, blue: 0.6)
                                ],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 200, height: 320)  // ✅ 明确的尺寸
                        .shadow(color: .purple.opacity(0.6), radius: 20)
                    
                    VStack(spacing: 15) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 60))
                            .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                        
                        if let card = drawnCard {
                            Text(card)
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                                .multilineTextAlignment(.center)
                        } else {
                            Text("塔罗牌")
                                .font(.title2)
                                .fontWeight(.bold)
                                .foregroundColor(.white)
                        }
                    }
                }
                
                // 卡片说明
                Text("你抽到的塔罗牌")
                    .font(.headline)
                    .foregroundColor(.white.opacity(0.9))
                
                // 确认按钮
                Button(action: {
                    withAnimation(.spring()) {
                        showTarotCard = false
                    }
                }) {
                    Text("确认")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(width: 120, height: 44)
                        .background(
                            RoundedRectangle(cornerRadius: 22)
                                .fill(Color(red: 0.7, green: 0.4, blue: 0.9))
                        )
                }
            }
            .padding(30)
            .frame(width: 300)  // ✅ 限制悬浮窗整体宽度
            .background(
                RoundedRectangle(cornerRadius: 25)
                    .fill(Color(red: 0.2, green: 0.1, blue: 0.35))
            )
            .overlay(
                RoundedRectangle(cornerRadius: 25)
                    .stroke(
                        LinearGradient(
                            colors: [Color(red: 0.8, green: 0.5, blue: 1.0), .purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 2
                    )
            )
            .shadow(color: .purple.opacity(0.5), radius: 30)
            // ✅ 添加缩放动画
            .scaleEffect(showTarotCard ? 1.0 : 0.8)
            .opacity(showTarotCard ? 1.0 : 0)
        }
    }
    
    // MARK: - 欢迎区
    private var welcomeSection: some View {
        VStack(spacing: 15) {
            // ✅ 添加测试按钮以显示悬浮窗
            Button(action: {
                drawnCard = "愚者(正位)"
                withAnimation(.spring()) {
                    showTarotCard = true
                }
            }) {
                HStack {
                    Image(systemName: "hand.tap.fill")
                        .font(.system(size: 28))
                    Text("点击测试悬浮窗")
                        .font(.headline)
                }
                .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
            }
            
            Text("神秘塔罗指引")
                .font(.title2).fontWeight(.bold)
                .foregroundColor(.white)
                .shadow(color: Color(red: 0.8, green: 0.3, blue: 1.0), radius: 2)
            
            Text("请输入您的问题或困惑")
                .font(.subheadline)
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                .opacity(0.9)
        }
        .padding(.vertical, 25)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 25)
                .fill(Color(red: 0.25, green: 0.15, blue: 0.4))
                .shadow(color: .purple.opacity(0.4), radius: 15, y: 5)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 25)
                .stroke(
                    LinearGradient(
                        colors: [Color(red: 0.7, green: 0.3, blue: 0.8), .purple],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1
                )
        )
    }
    
    // MARK: - 聊天消息视图
    private func chatMessageView(message: Message) -> some View {
        HStack(alignment: .top, spacing: 6) {
            if !message.isUser {
                Image(systemName: "moon.stars.fill")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                    .frame(width: 28, height: 28)
                    .background(
                        Circle()
                            .fill(Color(red: 0.3, green: 0.2, blue: 0.5))
                    )
            }
            
            Text(message.content)
                .font(.body)
                .foregroundColor(.white)
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(
                            message.isUser
                                ? Color(red: 0.5, green: 0.3, blue: 0.7)
                                : Color(red: 0.25, green: 0.15, blue: 0.4)
                        )
                )
                .frame(maxWidth: 280, alignment: message.isUser ? .trailing : .leading)
            
            if message.isUser {
                Image(systemName: "person.circle.fill")
                    .font(.caption)
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                    .frame(width: 28, height: 28)
            }
            
            Spacer()
        }
        .frame(maxWidth: .infinity, alignment: message.isUser ? .trailing : .leading)
    }
    
    // MARK: - 打字指示器
    private var typingIndicator: some View {
        HStack(spacing: 4) {
            ForEach(0..<3) { i in
                DotView(delay: Double(i) * 0.2)
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(red: 0.25, green: 0.15, blue: 0.4))
        )
        .frame(maxWidth: .infinity, alignment: .leading)
    }
    
    struct DotView: View {
        let delay: Double
        @State private var scale: CGFloat = 0.5
        
        var body: some View {
            Circle()
                .frame(width: 6, height: 6)
                .foregroundColor(.white)
                .scaleEffect(scale)
                .onAppear {
                    withAnimation(
                        .easeInOut(duration: 0.6)
                        .repeatForever(autoreverses: true)
                        .delay(delay)
                    ) {
                        scale = 1.0
                    }
                }
        }
    }
    
    // MARK: - 输入区域
    private var chatInputView: some View {
        VStack(spacing: 0) {
            Divider()
                .background(Color.purple.opacity(0.3))
            HStack(spacing: 8) {
                TextEditor(text: $inputText)
                    .scrollContentBackground(.hidden)
                    .background(Color.clear)
                    .font(.body)
                    .foregroundColor(.white)
                    .padding(.all, 14)
                    .frame(minHeight: 20, maxHeight: 100)
                    .onChange(of: inputText) { new in
                        if new.count > 300 {
                            inputText = String(new.prefix(300))
                        }
                    }
                    .background(
                        RoundedRectangle(cornerRadius: 20)
                            .fill(Color(red: 0.2, green: 0.12, blue: 0.35))
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color(red: 0.5, green: 0.3, blue: 0.7), lineWidth: 1)
                    )
                    .padding(.vertical, 8)
                
                Button(action: sendMessage) {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 30))
                        .symbolEffect(.bounce, value: UUID())
                        .foregroundColor(
                            inputText.isEmpty || sentCount >= 2
                                ? Color(red: 0.5, green: 0.4, blue: 0.7)
                                : Color(red: 0.8, green: 0.5, blue: 1.0)
                        )
                }
                .disabled(inputText.isEmpty || sentCount >= 2)
                .padding(.trailing, 4)
            }
            .padding(.horizontal, 8)
            .background(
                Color(red: 0.2, green: 0.1, blue: 0.35)
                    .edgesIgnoringSafeArea(.bottom)
            )
        }
    }
    
    // MARK: - 发送消息
    private func sendMessage() {
        guard sentCount < 2 else { return }
        sentCount += 1
        
        let userMessage = Message(
            content: inputText.trimmingCharacters(in: .whitespacesAndNewlines),
            isUser: true
        )
        messages.append(userMessage)
        let userInput = inputText
        inputText = ""
        isTyping = true
        
        var req = URLRequest(url: endpointURL)
        req.httpMethod = "POST"
        req.addValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        req.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "model": modelName,
            "messages": [
                ["role": "system", "content": systemPrompt],
                ["role": "user",   "content": userInput]
            ]
        ]
        req.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: req) { data, resp, err in
            if let err = err {
                print("Network error:", err)
            }
            if let http = resp as? HTTPURLResponse {
                print("Status code:", http.statusCode)
            }
            if let data = data, let body = String(data: data, encoding: .utf8) {
                print("Response body:", body)
            }
            DispatchQueue.main.async {
                isTyping = false
                guard
                    let data = data,
                    let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                    let choices = json["choices"] as? [[String: Any]],
                    let msg = choices.first?["message"] as? [String: Any],
                    let content = msg["content"] as? String
                else {
                    messages.append(Message(content: "请求出错,请稍后再试。", isUser: false))
                    return
                }
                messages.append(Message(content: content.trimmingCharacters(in: .whitespacesAndNewlines), isUser: false))
                
                // ✅ 示例:收到回复后显示悬浮窗
                // 你可以在这里解析 AI 返回的塔罗牌并显示
                // drawnCard = "从AI回复中提取的塔罗牌"
                // withAnimation(.spring()) {
                //     showTarotCard = true
                // }
            }
        }.resume()
    }
}

struct QuickDivinationView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            QuickDivinationView()
        }
    }
}
