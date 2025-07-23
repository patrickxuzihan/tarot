//
//  PostDetailView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/12/25.
//

import SwiftUI

struct PostDetailView: View {
    let post: Post
    @State private var commentText = ""
    @State private var comments: [Comment] = Comment.sampleComments
    @State private var isLiked = false
    @State private var likeCount = 0

    init(post: Post) {
        self.post = post
        self._isLiked = State(initialValue: post.isLiked)
        self._likeCount = State(initialValue: post.likes)
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

            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // 帖子内容
                    postContentSection

                    // 互动统计
                    interactionStatsSection

                    // 评论列表
                    commentsSection
                }
                .padding(.horizontal, 15)
                .padding(.top, 10)
            }
            // 动态键盘自适应：将评论输入区安全地附加到底部
            .safeAreaInset(edge: .bottom) {
                commentInputSection
            }
        }
        .navigationBarTitleDisplayMode(.inline)
    }

    private var postContentSection: some View {
        VStack(alignment: .leading, spacing: 20) {
            // 作者信息
            HStack {
                Image(post.authorAvatar)
                    .resizable()
                    .scaledToFill()
                    .frame(width: 50, height: 50)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.white.opacity(0.5), lineWidth: 1))

                VStack(alignment: .leading, spacing: 4) {
                    Text(post.author)
                        .font(.title3)
                        .fontWeight(.bold)
                        .foregroundColor(.white)

                    Text(post.formattedTime)
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

            // 帖子标题、标签和内容
            VStack(alignment: .leading, spacing: 15) {
                Text(post.title)
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)

                // 新增：显示标签
                if !post.tags.isEmpty {
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 10) {
                            ForEach(post.tags, id: \.self) { tag in
                                Text("#\(tag)")
                                    .font(.subheadline)
                                    .foregroundColor(.white)
                                    .padding(.horizontal, 10)
                                    .padding(.vertical, 5)
                                    .background(
                                        Capsule()
                                            .fill(Color.purple.opacity(0.4))
                                    )
                            }
                        }
                    }
                }

                Text(post.content)
                    .font(.body)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .lineSpacing(6)
            }
            .padding(.vertical, 10)

            // 互动按钮
            HStack(spacing: 30) {
                Button(action: {
                    isLiked.toggle()
                    likeCount += isLiked ? 1 : -1
                }) {
                    HStack(spacing: 5) {
                        Image(systemName: isLiked ? "heart.fill" : "heart")
                            .font(.title2)
                            .foregroundColor(isLiked ? .red : Color(red: 0.8, green: 0.7, blue: 1.0))

                        Text("\(likeCount)")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }

                Button(action: {
                    // 评论
                    print("评论帖子")
                }) {
                    HStack(spacing: 5) {
                        Image(systemName: "bubble.left")
                            .font(.title2)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))

                        Text("\(post.comments)")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }

                Button(action: {
                    // 分享
                    print("分享帖子")
                }) {
                    HStack(spacing: 5) {
                        Image(systemName: "arrowshape.turn.up.right")
                            .font(.title2)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))

                        Text("分享")
                            .font(.headline)
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                    }
                }

                Spacer()
            }
            .padding(.top, 10)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 15)
                .fill(Color(red: 0.25, green: 0.15, blue: 0.4))
        )
    }

    private var interactionStatsSection: some View {
        HStack {
            Text("\(likeCount)人点赞 • \(comments.count)条评论")
                .font(.subheadline)
                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))

            Spacer()
        }
        .padding(.horizontal, 5)
    }

    private var commentsSection: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("评论")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)

            ForEach(comments) { comment in
                commentRow(comment: comment)
            }
        }
    }

    private func commentRow(comment: Comment) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(comment.authorAvatar)
                .resizable()
                .scaledToFill()
                .frame(width: 40, height: 40)
                .clipShape(Circle())
                .overlay(Circle().stroke(Color.white.opacity(0.5), lineWidth: 1))

            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    Text(comment.author)
                        .font(.headline)
                        .foregroundColor(.white)

                    Text(comment.relativeTime)
                        .font(.caption)
                        .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))

                    Spacer()

                    Button(action: {
                        // 点赞评论
                        print("点赞评论")
                    }) {
                        HStack(spacing: 4) {
                            Image(systemName: "heart")
                                .font(.caption)
                                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))

                            Text("\(comment.likes)")
                                .font(.caption)
                                .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        }
                    }
                }

                Text(comment.content)
                    .font(.body)
                    .foregroundColor(Color(red: 0.9, green: 0.8, blue: 1.0))
                    .padding(.vertical, 5)

                HStack {
                    Button(action: {
                        // 回复评论
                        print("回复评论")
                    }) {
                        Text("回复")
                            .font(.caption)
                            .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
                    }

                    Spacer()
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 12)
                .fill(Color(red: 0.3, green: 0.2, blue: 0.45))
        )
    }

    private var commentInputSection: some View {
        HStack {
            TextField("写下你的评论...", text: $commentText)
                .padding(12)
                .background(Color.purple.opacity(0.3))
                .cornerRadius(20)
                .foregroundColor(.white)

            Button(action: {
                // 发布评论
                if !commentText.isEmpty {
                    let newComment = Comment(
                        id: UUID(),
                        author: "当前用户",
                        authorAvatar: "current_user",
                        content: commentText,
                        timestamp: Date(),
                        likes: 0
                    )
                    comments.append(newComment)
                    commentText = ""
                }
            }) {
                Image(systemName: "paperplane.fill")
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding(10)
                    .background(
                        Circle()
                            .fill(Color(red: 0.8, green: 0.5, blue: 1.0))
                    )
            }
            .disabled(commentText.isEmpty)
        }
        .padding()
        .background(
            Color(red: 0.2, green: 0.1, blue: 0.35)
                .edgesIgnoringSafeArea(.bottom)
        )
    }
}

struct PostDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            PostDetailView(post: Post.samplePosts[0])
        }
        .preferredColorScheme(.dark)
    }
}
