//
//  AdView4.swift
//  Tarot
//
//  Created by Xu Zihan on 6/24/25.
//

import SwiftUI

struct AdView4: View {
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Image("Timage3") // 修改为 Timage3
                .resizable()
                .scaledToFill()
                .frame(height: 180)
                .clipped()
                .cornerRadius(15)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
