//
//  AdView3.swift
//  Tarot
//
//  Created by Xu Zihan on 6/24/25.
//

import SwiftUI

struct AdView3: View {
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Image("Timage2") // 修改为 Timage2
                .resizable()
                .scaledToFill()
                .frame(height: 180)
                .clipped()
                .cornerRadius(15)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
