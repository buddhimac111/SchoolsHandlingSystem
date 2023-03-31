import 'package:flutter/material.dart';
import 'package:new_login/view/utils/global.colors.dart';
import 'package:new_login/view/widgets/button.global.dart';
import 'package:new_login/view/widgets/text.form.global.dart';

class LoginView extends StatelessWidget {
  LoginView({Key? key}) : super(key: key);
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(15.0),
              height: MediaQuery.of(context).size.height,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 20),
                  Center(
                    child: Text('Logo',
                      style: TextStyle(
                        color: GlobalColors.mainColor,
                        fontSize: 35,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  // Container(
                  //   alignment: Alignment.center,
                  //   child: const Image(
                  //     image: AssetImage('assets/images/logo.svg'),
                  //     width: 100,
                  //     height: 100,
                  //     fit: BoxFit.contain,
                  //   )
                  // ),

                  const SizedBox(height: 50),
                  Text('Login to your account',
                    style: TextStyle(
                      color: GlobalColors.textColor,
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 15),
                  TextFormGlobal(
                    controller: emailController,
                    text: 'Email',
                    obscure: false,
                    textInputType: TextInputType.emailAddress,
                  ),
                  const SizedBox(height: 15),
                  TextFormGlobal(
                      controller: passwordController,
                      text: 'Password',
                      textInputType: TextInputType.text,
                      obscure: true,
                  ),
                  const SizedBox(height: 15),
                  const ButtonGlobal(),
                ],
              ),
            ),
        ),
      )
    );
  }
}
