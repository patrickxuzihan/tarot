import SwiftUI

struct QuickDivinationSectionView: View {
    var body: some View {
        VStack(spacing: 15) {
            Text("快速占卜")
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.leading, 5)

            // 这里的内容只是装饰，真正的点击事件由外层 NavigationLink 触发
            VStack(spacing: 15) {
                Image(systemName: "sparkles")
                    .font(.system(size: 40))
                    .symbolEffect(.bounce, options: .repeating)
                    .foregroundColor(Color(red: 1.0, green: 0.8, blue: 0.3))

                Text("点击开始神秘占卜")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding(.bottom, 10)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 25)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.purple.opacity(0.6))
            )
            .shadow(color: .purple.opacity(0.7), radius: 15, y: 5)
        }
    }
}

struct QuickDivinationSectionView_Previews: PreviewProvider {
    static var previews: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            QuickDivinationSectionView()
                .padding(.horizontal, 20)
        }
        .preferredColorScheme(.dark)
    }
}
