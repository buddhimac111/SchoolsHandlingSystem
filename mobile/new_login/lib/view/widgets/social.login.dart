import 'package:flutter/material.dart';

import '../../utils/global.colors.dart';

class SocialLogin extends StatelessWidget {
  const SocialLogin({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
        'Sign In',
        style: TextStyle(
        color: GlobalColors.textColor,
        fontWeight: FontWeight.w600,
        ),
        ),
      ],
    );
  }
}
