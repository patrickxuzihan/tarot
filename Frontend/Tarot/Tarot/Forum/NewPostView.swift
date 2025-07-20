//
//  NewPostView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/12/25.
//

import SwiftUI

struct NewPostView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var postTitle = ""
    @State private var postContent = ""
    @State private var selectedTopic = "选择话题"
    
    let topics = ["塔罗解读", "牌意讨论", "占卜经验", "问题求助", "其他"]
    
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
                // 顶部导航栏
                newPostHeader
                
                // 主内容区
                ScrollView {
                    VStack(spacing: 20) {
                        // 话题选择
                        topicSelectionSection
                        
                        // 标题输入
                        titleInputSection
                        
                        // 内容输入
                        contentInputSection
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                }
                
                // 发布按钮
                publishButton
            }
        }
    }
    
    private var newPostHeader: some View {
        HStack {
            Button(action: {
                presentationMode.wrappedValue.dismiss()
            }) {
                Text("取消")
                    .font(.headline)
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
            }
            
            Spacer()
            
            Text("发布新帖")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.white)
            
            Spacer()
            
            Button(action: {
                // 保存草稿
                print("保存草稿")
            }) {
                Text("草稿")
                    .font(.headline)
                    .foregroundColor(Color(red: 0.8, green: 0.5, blue: 1.0))
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
            // 发布帖子
            if !postTitle.isEmpty && !postContent.isEmpty {
                print("发布帖子: \(postTitle)")
                presentationMode.wrappedValue.dismiss()
            }
        }) {
            Text("发布")
                .font(.headline)
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
                .background(
                    LinearGradient(
                        colors: [
                            Color(red: 0.7, green: 0.3, blue: 0.9),
                            .purple
                        ],
                        startPoint: .leading,
                        endPoint: .trailing
                    )
                )
        }
        .disabled(postTitle.isEmpty || postContent.isEmpty)
        .opacity(postTitle.isEmpty || postContent.isEmpty ? 0.6 : 1.0)
    }
}

struct NewPostView_Previews: PreviewProvider {
    static var previews: some View {
        NewPostView()
    }
}
