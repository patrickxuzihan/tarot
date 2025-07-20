//
//  StatsInsightsView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/15/25.
//
import SwiftUI

struct StatsInsightsView: View {
    var body: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            Text("数据洞察 - 功能开发中")
                .font(.title)
                .foregroundColor(.white)
        }
        .navigationBarTitle("数据洞察", displayMode: .inline)
    }
}

struct StatsInsightsView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack { StatsInsightsView() }
            .preferredColorScheme(.dark)
    }
}
