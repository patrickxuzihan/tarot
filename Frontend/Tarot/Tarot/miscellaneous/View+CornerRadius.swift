//
//  View+CornerRadius.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

import SwiftUI
import UIKit

fileprivate struct RoundedCorner: Shape {
    var radius: CGFloat
    var corners: UIRectCorner
    func path(in rect: CGRect) -> Path {
        let bezier = UIBezierPath(
            roundedRect: rect,
            byRoundingCorners: corners,
            cornerRadii: CGSize(width: radius, height: radius)
        )
        return Path(bezier.cgPath)
    }
}

extension View {
    /// 对指定角做圆角
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners))
    }
}
