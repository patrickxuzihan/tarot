//
//  AdView2.swift
//  Tarot
//
//  Created by Xu Zihan on 6/24/25.
//

import SwiftUI

struct AdView2: View {
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Image("Timage1") // 修改为 Timage1
                .resizable()
                .scaledToFill()
                .frame(height: 180)
                .clipped()
                .cornerRadius(15)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
