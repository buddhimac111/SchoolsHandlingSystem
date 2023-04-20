// import 'package:flutter/material.dart';
//
// class HomeWork extends StatelessWidget {
//   const HomeWork({Key? key}) : super(key: key);
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Column(
//         children: [
//           Expanded(
//             child: Container(
//               width: 100.0,
//               decoration: const BoxDecoration(
//                 color: Colors.transparent,
//                 borderRadius: BorderRadius.all(Radius.zero),
//               ),
//               child: ListView(
//
//               ),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
//
// class HomeCard extends StatelessWidget {
//   const HomeCard(
//       {Key? key,
//       required this.onPress,
//       required this.icon,
//       required this.title})
//       : super(key: key);
//   final VoidCallback onPress;
//   final String icon;
//   final String title;
//   @override
//   Widget build(BuildContext context) {
//     return InkWell(
//       onTap: onPress,
//       child: Container(
//         margin: EdgeInsets.only(top: 1.h),
//         width: 40.w,
//         height: 20.h,
//         decoration: BoxDecoration(
//           color: kPrimaryColor,
//           borderRadius: BorderRadius.circular(kDefaultPadding / 2),
//         ),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.spaceAround,
//           crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             SvgPicture.asset(
//               icon,
//               height: SizerUtil.deviceType == DeviceType.tablet ? 30.sp : 40.sp,
//               width: SizerUtil.deviceType == DeviceType.tablet ? 30.sp : 40.sp,
//               color: kOtherColor,
//             ),
//             Text(
//               title,
//               textAlign: TextAlign.center,
//               style: Theme.of(context).textTheme.subtitle2,
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
