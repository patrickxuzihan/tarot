//
//  ReadingHistoryView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/15/25.
//

import SwiftUI

struct ReadingHistoryView: View {
    var body: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            Text("阅读历史 - 功能开发中")
                .font(.title)
                .foregroundColor(.white)
        }
        .navigationBarTitle("阅读历史", displayMode: .inline)
    }
}

struct ReadingHistoryView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack { ReadingHistoryView() }
            .preferredColorScheme(.dark)
    }
}
