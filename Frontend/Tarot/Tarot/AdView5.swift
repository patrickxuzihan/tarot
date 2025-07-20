//
//  AdView5.swift
//  Tarot
//
//  Created by Xu Zihan on 6/24/25.
//

import SwiftUI

struct AdView5: View {
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Image("Timage4") // 修改为 Timage4
                .resizable()
                .scaledToFill()
                .frame(height: 180)
                .clipped()
                .cornerRadius(15)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
