import 'dart:convert';

import 'package:flutter/material.dart';
import '../utils/global.colors.dart';
import 'package:http/http.dart' as http;



class ButtonGlobal extends StatelessWidget {
  const ButtonGlobal({
    Key? key,
    required this.emailController,
    required this.passwordController,
  }) : super(key: key);

  final TextEditingController emailController;
  final TextEditingController passwordController;

  @override
  Widget build(BuildContext context) {
    return InkWell(
        onTap:  () async {

          final String email = emailController.text;
          final String password = passwordController.text;
          print('Email: $email\nPassword: $password');
        print('Logged in ');
        var headers = {
          'Content-Type': 'application/json'
        };
        var request = http.Request('GET', Uri.parse('http://10.0.2.2:3000/api/auth/student'));
        request.body = json.encode({
          "_id": email,
          "password": password,
        });
        request.headers.addAll(headers);

        http.StreamedResponse response = await request.send();

        if (response.statusCode == 200) {
          Navigator.pushNamed(context, '/');
        }
        else {
          print(await response.stream.bytesToString());
        }
        print("finished");



      },

      child: Container(
        alignment: Alignment.center,
        height: 55,
        decoration: BoxDecoration(
          color: GlobalColors.mainColor,
          borderRadius: BorderRadius.circular(6),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
            ),
          ],
        ),
        child: const Text(
          'Sign In',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  void setState(Null Function() param0) {}
}
