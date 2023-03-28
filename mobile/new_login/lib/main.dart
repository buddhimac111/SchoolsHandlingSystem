import 'package:flutter/material.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:new_login/view/splash.view.dart';
import 'package:device_preview/device_preview.dart';

void main() => runApp(
  DevicePreview(
    builder: (context) => App(), // Wrap your app
  ),
);

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      locale: DevicePreview.locale(context),
      builder: DevicePreview.appBuilder,
      debugShowCheckedModeBanner: false,
      home: const SplashView(),
    );
  }
}
