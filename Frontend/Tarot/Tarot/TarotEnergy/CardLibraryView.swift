//
//  CardLibraryView.swift
//  Tarot
//
//  Created by Xu Zihan on 7/15/25.
//

import SwiftUI

struct CardLibraryView: View {
    var body: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            Text("牌阵库 - 功能开发中")
                .font(.title)
                .foregroundColor(.white)
        }
        .navigationBarTitle("牌阵库", displayMode: .inline)
    }
}

struct CardLibraryView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack { CardLibraryView() }
            .preferredColorScheme(.dark)
    }
}
