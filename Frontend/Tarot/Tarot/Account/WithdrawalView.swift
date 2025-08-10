//
//  WithdrawalView.swift
//  Tarot
//
//  Created by Xu Zihan on 2025/8/10.
//

// Account/WithdrawalView.swift
import SwiftUI

struct WithdrawalView: View {
    var body: some View {
        ZStack {
            // 使用与AccountView一致的背景
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(red: 0.1, green: 0.05, blue: 0.2),
                    Color(red: 0.15, green: 0.05, blue: 0.25),
                    Color(red: 0.2, green: 0.1, blue: 0.35)
                ]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                Text("提现功能开发中...")
                    .font(.title2)
                    .foregroundColor(.gray)
                    .padding()
                
                // 占位内容
                VStack(spacing: 25) {
                    VStack {
                        Text("可提现金额")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                        
                        Text("¥ 128.50")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                    
                    VStack(alignment: .leading, spacing: 15) {
                        Text("提现金额")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            Text("¥")
                                .foregroundColor(.white)
                                .padding(.leading)
                            
                            TextField("输入提现金额", text: .constant(""))
                                .foregroundColor(.white)
                                .keyboardType(.decimalPad)
                                .padding()
                        }
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(10)
                        
                        Text("支付方式")
                            .foregroundColor(Color(red: 0.8, green: 0.7, blue: 1.0))
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            Image(systemName: "creditcard.fill")
                                .foregroundColor(.blue)
                            
                            Text("支付宝")
                                .foregroundColor(.white)
                            
                            Spacer()
                            
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                        .padding()
                        .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                        .cornerRadius(10)
                        
                        Button(action: {}) {
                            Text("确认提现")
                                .font(.headline)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color(red: 0.5, green: 0.2, blue: 0.7))
                                .cornerRadius(15)
                        }
                        .padding(.top)
                    }
                    .padding()
                    .background(Color(red: 0.15, green: 0.08, blue: 0.3).opacity(0.7))
                    .cornerRadius(15)
                }
                .padding(.horizontal)
            }
        }
        .navigationTitle("提现")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct WithdrawalView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationStack {
            WithdrawalView()
        }
        .preferredColorScheme(.dark)
    }
}
