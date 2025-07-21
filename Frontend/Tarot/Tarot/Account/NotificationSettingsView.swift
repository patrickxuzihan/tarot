////
////  NotificationSettingsView.swift
////  Tarot
////
////  Created by Xu Zihan on 7/21/25.
////暂时不会用到
//
//import SwiftUI
//
//struct NotificationSettingsView: View {
//    @State private var pushNotifications = true
//    @State private var emailNotifications = false
//    @State private var marketingNotifications = false
//
//    var body: some View {
//        ZStack {
//            LinearGradient(
//                gradient: Gradient(colors: [
//                    Color(red: 0.15, green: 0.05, blue: 0.25),
//                    Color(red: 0.25, green: 0.10, blue: 0.40)
//                ]),
//                startPoint: .top,
//                endPoint: .bottom
//            )
//            .edgesIgnoringSafeArea(.all)
//
//            Form {
//                Section(header: Text("通知类型").foregroundColor(.purple)) {
//                    Toggle("推送通知", isOn: $pushNotifications)
//                    Toggle("邮件通知", isOn: $emailNotifications)
//                    Toggle("营销推送", isOn: $marketingNotifications)
//                }
//
//                Section {
//                    Button("清除通知记录") {
//                        // TODO: 清除本地通知记录
//                    }
//                    .foregroundColor(.white)
//                    .listRowBackground(Color.purple.opacity(0.8))
//                }
//            }
//            .scrollContentBackground(.hidden)
//            .background(Color.clear)
//            .foregroundColor(.white)
//        }
//        .navigationTitle("通知设置")
//        .navigationBarTitleDisplayMode(.inline)
//    }
//}
