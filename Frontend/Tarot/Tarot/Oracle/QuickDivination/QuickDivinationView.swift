//
//  QuickDivinationView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/26/25.
//  悬浮窗一直显示，用户可主动关闭

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
    @State private var showCardOverlay = true  // ✅ 默认显示悬浮窗
    @State private var currentCards: [TarotCardData] = TarotCardData.randomCards()  // ✅ 初始就有牌
    
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
    
    // 预设 prompt
    private let systemPrompt = """
    你是一位塔罗解读师，用最口语化的方式给出不超过600字的指引。
    1. 请先"模拟抽三张塔罗牌"，然后结合正逆位说一两句。
    2. 不要出现"AI"、"模型"之类词汇。
    3. 不只是解读牌，还要给个实际例子，比如"比如你在职场…"，让建议更贴地气。
    4. 结尾保持一句行动建议即可。
    5. 如果这是用户的第二次提问，请基于之前的占卜结果继续解读，保持前后连贯。
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
                                // ✅ 为悬浮窗预留空间
                                if showCardOverlay {
                                    Color.clear.frame(height: 150)
                                }
                                
                                // 精简的欢迎区域
                                welcomeSection
                                    .padding(.top, showCardOverlay ? 0 : 20)
                                    .padding(.bottom, 10)
                                
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
                    
                    // 占卜次数提示
                    occupyCountHint
                    
                    // 输入区
                    chatInputView
                }
                
                // ✅ 塔罗牌展示悬浮窗（默认显示）
                if showCardOverlay {
                    TarotCardOverlay(
                        cards: currentCards,
                        onDismiss: {
                            withAnimation(.spring(response: 0.3)) {
                                showCardOverlay = false
                            }
                        }
                    )
                    .transition(.move(edge: .top).combined(with: .opacity))
                }
            }
            .navigationBarTitle("塔罗占卜", displayMode: .inline)
        }
    }
    
    // MARK: - 占卜次数提示
    private var occupyCountHint: some View {
        Group {
            if sentCount >= 2 {
                Text("本轮占卜次数已用完")
                    .font(.footnote)
                    .foregroundColor(.red)
                    .padding(.bottom, 4)
            } else if sentCount == 1 {
                Text("还可以追问 1 次")
                    .font(.footnote)
                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    .padding(.bottom, 4)
            }
        }
    }
    
    // MARK: - 精简的欢迎区域
    private var welcomeSection: some View {
        VStack(spacing: 8) {
            Text("欢迎来到塔罗占卜")
                .font(.headline)
                .fontWeight(.semibold)
                .foregroundColor(.white)
            
            Text("可提问两次，第二次可延续第一次")
                .font(.caption)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
        }
        .padding(.vertical, 10)
    }
    
    // MARK: - 聊天气泡
    private func chatMessageView(message: Message) -> some View {
        HStack(alignment: .top, spacing: 8) {
            if !message.isUser {
                Image(systemName: "sparkles")
                    .font(.system(size: 36))
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                    .padding(.top, 4)
                    .padding(.leading, 4)
                
                Text(message.content)
                    .font(.system(size: 16))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 10)
                    .background(Color(red: 0.3, green: 0.15, blue: 0.4))
                    .cornerRadius(18)
                
                Spacer()
            } else {
                Spacer()
                
                Text(message.content)
                    .font(.system(size: 16))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 10)
                    .background(Color(red: 0.5, green: 0.2, blue: 0.8))
                    .cornerRadius(18)
                
                Image(systemName: "person.crop.circle")
                    .font(.system(size: 36))
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                    .padding(.top, 4)
                    .padding(.trailing, 4)
            }
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
    }
    
    // MARK: - 打字指示器
    private var typingIndicator: some View {
        HStack(spacing: 6) {
            Image(systemName: "sparkles")
                .font(.system(size: 20))
                .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                .symbolEffect(.bounce, value: UUID())
            
            Text("塔罗精灵正在解读牌面…")
                .font(.system(size: 14))
                .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
            
            DotView(delay: 0)
            DotView(delay: 0.2)
            DotView(delay: 0.4)
        }
        .padding(.horizontal, 8)
        .padding(.vertical, 10)
        .background(
            Color(red: 0.3, green: 0.15, blue: 0.4)
                .cornerRadius(15)
        )
    }
    
    // MARK: - 打字动画点
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
        
        // 构建完整的对话历史
        var apiMessages: [[String: String]] = [
            ["role": "system", "content": systemPrompt]
        ]
        
        for message in messages {
            let role = message.isUser ? "user" : "assistant"
            apiMessages.append(["role": role, "content": message.content])
        }
        
        // 构造 DeepSeek 请求
        var req = URLRequest(url: endpointURL)
        req.httpMethod = "POST"
        req.addValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        req.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "model": modelName,
            "messages": apiMessages
        ]
        
        req.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: req) { data, resp, err in
            DispatchQueue.main.async {
                isTyping = false
                guard
                    let data = data,
                    let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                    let choices = json["choices"] as? [[String: Any]],
                    let msg = choices.first?["message"] as? [String: Any],
                    let content = msg["content"] as? String
                else {
                    messages.append(Message(content: "请求出错，请稍后再试。", isUser: false))
                    return
                }
                
                let aiResponse = content.trimmingCharacters(in: .whitespacesAndNewlines)
                messages.append(Message(content: aiResponse, isUser: false))
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
