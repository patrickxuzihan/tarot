//
//  MembershipDetailView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/24/25.
//

import SwiftUI

/// 会员详情页，展示当前会员类型及权益对比
struct MembershipDetailView: View {
    /// 当前查看的会员类型
    let memberType: MemberType

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
                VStack(spacing: 20) {
                    // 标题
                    Text(memberType == .basic ? "基础版会员详情" : "高级版会员详情")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .padding(.top, 30)

                    // 到期日或说明
                    if memberType != .none {
                        Text("有效期至 \(User(name: "", email: "", id: "", memberType: memberType, joinDate: Date(), horoscope: .libra).memberExpiryDate.formatted(date: .long, time: .omitted))")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                    } else {
                        Text("您尚未开通会员")
                            .font(.subheadline)
                            .foregroundColor(.white.opacity(0.8))
                    }

                    // 权益对比表
                    VStack(spacing: 0) {
                        // 表头
                        HStack {
                            Text("权益")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity, alignment: .leading)
                            Text(memberType == .basic ? "基础版" : "高级版")
                                .font(.headline)
                                .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))
                                .frame(width: 120, alignment: .center)
                        }
                        .padding(15)
                        .background(Color(red: 0.2, green: 0.1, blue: 0.35))

                        // 各项权益
                        ForEach(MembershipFeature.allCases, id: \.self) { feature in
                            HStack {
                                Text(feature.title)
                                    .foregroundColor(.white)
                                    .frame(maxWidth: .infinity, alignment: .leading)

                                // 根据类型显示对应描述
                                Text(memberType == .basic
                                     ? feature.basicDescription
                                     : feature.premiumDescription)
                                    .foregroundColor(memberType == .basic ? .white : Color(red: 1.0, green: 0.8, blue: 0.3))
                                    .frame(width: 120, alignment: .center)
                            }
                            .padding(15)
                            .background(
                                Color(red: 0.15, green: 0.07, blue: 0.3)
                                    .opacity(feature.id % 2 == 0 ? 1.0 : 0.8)
                            )
                        }
                    }
                    .cornerRadius(15)
                    .overlay(
                        RoundedRectangle(cornerRadius: 15)
                            .stroke(Color(red: 0.6, green: 0.3, blue: 0.8), lineWidth: 1)
                    )
                    .padding(.horizontal, 20)

                    Spacer()
                }
            }
        }
        .navigationTitle("会员详情")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct MembershipDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            MembershipDetailView(memberType: .premium)
        }
        .preferredColorScheme(.dark)
    }
}

