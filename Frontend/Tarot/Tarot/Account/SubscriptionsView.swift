//
//  SubscriptionsView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Account/SubscriptionsView.swift
import SwiftUI

struct SubscriptionsView: View {
    var body: some View {
        ZStack {
            // 使用与AccountView一致的背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                Text("订阅管理开发中...")
                    .font(.title2)
                    .foregroundColor(.gray)
                    .padding()
                
                // 占位内容
                VStack(spacing: 20) {
                    ForEach(0..<2) { index in
                        VStack(alignment: .leading) {
                            HStack {
                                Text("高级会员套餐 \(index + 1)")
                                    .foregroundColor(.white)
                                    .font(.headline)
                                
                                Spacer()
                                
                                Text(index == 0 ? "已订阅" : "试用中")
                                    .font(.caption)
                                    .padding(5)
                                    .background(Capsule().fill(index == 0 ? Color.green : Color.orange))
                                    .foregroundColor(.white)
                            }
                            
                            Divider()
                                .background(Color(red: 0.3, green: 0.2, blue: 0.5))
                            
                            HStack {
                                Image(systemName: "calendar")
                                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                                
                                Text("有效期至: 2024-12-31")
                                    .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                                    .font(.caption)
                                
                                Spacer()
                                
                                Button(action: {}) {
                                    Text(index == 0 ? "管理" : "升级")
                                        .font(.caption)
                                        .padding(8)
                                        .background(Capsule().fill(Color(red: 0.5, green: 0.3, blue: 0.7)))
                                }
                            }
                        }
                        .padding()
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(15)
                    }
                }
                .padding(.horizontal)
            }
        }
        .navigationTitle("我的订阅")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct SubscriptionsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            SubscriptionsView()
        }
        .preferredColorScheme(.dark)
    }
}
