import SwiftUI

struct NewPostView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var postTitle = ""
    @State private var postContent = ""
    @State private var selectedTopic = "选择话题"

    let topics = ["塔罗解读", "牌意讨论", "占卜经验", "问题求助", "其他"]
    let onComplete: (Bool) -> Void

    init(onComplete: @escaping (Bool) -> Void = { _ in }) {
        self.onComplete = onComplete
    }

    var body: some View {
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
                newPostHeader

                ScrollView {
                    VStack(spacing: 20) {
                        topicSelectionSection
                        titleInputSection
                        contentInputSection
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                }

                publishButton
            }
        }
    }

    private var newPostHeader: some View {
        HStack {
            Button("取消") {
                presentationMode.wrappedValue.dismiss()
                onComplete(false)
            }
            .font(.headline)
            .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))

            Spacer()

            Text("发布新帖")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)

            Spacer()

            Button("草稿") {
                // TODO: 保存草稿
            }
            .font(.headline)
            .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 15)
        .background(
            Color(red: 0.2, green: 0.1, blue: 0.35)
                .opacity(0.8)
                .edgesIgnoringSafeArea(.top)
        )
    }

    private var topicSelectionSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("选择话题")
                .font(.headline)
                .foregroundColor(.white)

            Menu {
                ForEach(topics, id: \.self) { topic in
                    Button(topic) {
                        selectedTopic = topic
                    }
                }
            } label: {
                HStack {
                    Text(selectedTopic)
                        .foregroundColor(selectedTopic == "选择话题" ? .gray : .white)
                    Spacer()
                    Image(systemName: "chevron.down")
                        .foregroundColor(.white)
                }
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.purple.opacity(0.3))
                )
            }
        }
    }

    private var titleInputSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("标题")
                .font(.headline)
                .foregroundColor(.white)

            TextField("输入帖子标题", text: $postTitle)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.purple.opacity(0.3))
                )
                .foregroundColor(.white)
        }
    }

    private var contentInputSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("内容")
                .font(.headline)
                .foregroundColor(.white)

            TextEditor(text: $postContent)
                .frame(minHeight: 200)
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.purple.opacity(0.3))
                )
                .foregroundColor(.white)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(Color.purple.opacity(0.5), lineWidth: 1)
                )
        }
    }

    private var publishButton: some View {
        Button(action: {
            ForumService.createPost(
                topic: selectedTopic,
                title: postTitle,
                content: postContent
            ) { success in
                if success {
                    presentationMode.wrappedValue.dismiss()
                    onComplete(true)
                }
            }
        }) {
            Text("发布")
                .font(.headline)
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
                .background(
                    LinearGradient(
                        colors: [Color(red: 0.7, green: 0.3, blue: 0.9), .purple],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
        }
        .disabled(postTitle.isEmpty || postContent.isEmpty || selectedTopic == "选择话题")
        .opacity(postTitle.isEmpty || postContent.isEmpty || selectedTopic == "选择话题" ? 0.6 : 1.0)
    }
}

struct NewPostView_Previews: PreviewProvider {
    static var previews: some View {
        NewPostView()
    }
}
