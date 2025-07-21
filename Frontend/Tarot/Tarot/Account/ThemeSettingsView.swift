//// ThemeSettingsView.swift
///暂时不会用到
//import SwiftUI
//
//struct ThemeSettingsView: View {
//    enum ThemeMode: String, CaseIterable {
//        case system = "跟随系统"
//        case light  = "浅色模式"
//        case dark   = "深色模式"
//    }
//    @State private var selectedMode: ThemeMode = .system
//    @State private var accentColor: Color = .purple
//    let accentOptions: [Color] = [.purple, .blue, .green, .orange, .pink]
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
//                Section(header: Text("主题模式").foregroundColor(.purple)) {
//                    Picker("模式", selection: $selectedMode) {
//                        ForEach(ThemeMode.allCases, id: \.self) { mode in
//                            Text(mode.rawValue).tag(mode)
//                        }
//                    }
//                    .pickerStyle(.segmented)
//                }
//
//                Section(header: Text("强调色").foregroundColor(.purple)) {
//                    HStack(spacing: 16) {
//                        ForEach(accentOptions, id: \.self) { color in
//                            Circle()
//                                .fill(color)
//                                .frame(width: selectedMode == .system ? 0 : 30,
//                                       height: selectedMode == .system ? 0 : 30)
//                                .overlay(
//                                    Circle()
//                                        .stroke(Color.white, lineWidth: accentColor == color ? 3 : 0)
//                                )
//                                .onTapGesture {
//                                    accentColor = color
//                                }
//                        }
//                    }
//                    .padding(.vertical, 8)
//                }
//            }
//            .scrollContentBackground(.hidden)
//            .background(Color.clear)
//            .foregroundColor(.white)
//        }
//        .navigationTitle("个性化主题")
//        .navigationBarTitleDisplayMode(.inline)
//        .onChange(of: selectedMode) { _ in
//            // TODO: 更新 ColorScheme
//        }
//    }
//}
//
//// MARK: - 预览
//struct ThemeSettingsView_Previews: PreviewProvider {
//    static var previews: some View {
//        NavigationStack {
//            ThemeSettingsView()
//        }
//        .preferredColorScheme(.dark)
//    }
//}
