////
////  LanguageSettingsView.swift
////  Tarot
////
////  Created by Xu Zihan on 7/21/25.
////
///暂时不会用到
//
//import SwiftUI
//
//struct LanguageSettingsView: View {
//    let languages = ["简体中文", "English", "日本語", "한국어", "Français"]
//    @State private var selectedLanguage = "简体中文"
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
//                Section(header: Text("选择语言").foregroundColor(.purple)) {
//                    Picker("语言", selection: $selectedLanguage) {
//                        ForEach(languages, id: \.self) { lang in
//                            Text(lang).tag(lang)
//                        }
//                    }
//                    .pickerStyle(.inline)
//                }
//                
//                Section {
//                    Button("重启应用以应用语言") {
//                        // TODO: 重启应用或提示重启
//                    }
//                    .foregroundColor(.white)
//                    .listRowBackground(Color.purple.opacity(0.8))
//                }
//            }
//            .scrollContentBackground(.hidden)
//            .background(Color.clear)
//            .foregroundColor(.white)
//        }
//        .navigationTitle("语言设置")
//        .navigationBarTitleDisplayMode(.inline)
//    }
//}
