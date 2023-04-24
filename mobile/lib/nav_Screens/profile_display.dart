// import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'package:shared_preferences/shared_preferences.dart';
//
// class StdProfile extends StatelessWidget {
//   const StdProfile({Key? key}) : super(key: key);
//
//   // Define a function to load the data from the API endpoint
//   Future<Map<String, dynamic>> fetchData() async {
//
//     SharedPreferences prefs = await SharedPreferences.getInstance();
//     String myValue = prefs.getString('email').toString();
//     print('sharedff value: $myValue');
//     final response = await http.get(Uri.parse('https://example.com/api/data'));
//     if (response.statusCode == 200) {
//       // If the API call is successful, parse the JSON response and return the data as a Map
//       return jsonDecode(response.body);
//     } else {
//       // If the API call is unsuccessful, throw an error
//       throw Exception('Failed to load data');
//     }
//   }
//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: const EdgeInsets.all(8.0),
//       child: Container(
//           width: double.infinity,
//           height: 150,
//           decoration: const BoxDecoration(
//             color: Color.fromARGB(255, 98, 200, 255),
//             borderRadius: BorderRadius.only(
//               bottomLeft: Radius.circular(8.0),
//               bottomRight: Radius.circular(8.0),
//               topLeft: Radius.circular(8.0),
//               topRight: Radius.circular(8.0),
//             ),
//           ),
//           child: Row(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               const CircleAvatar(
//                 maxRadius: 50.0,
//                 minRadius: 50.0,
//                 backgroundColor: Colors.cyan,
//                 backgroundImage: AssetImage("assets/Hello.jpeg"),
//               ),
//               const SizedBox(
//                 width: 20.0,
//               ),
//               Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: const [
//                   Text(
//                     "Buddhima Wijesooriya",
//                     style:
//                     TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
//                   ),
//                   Text(
//                     "Class 13 A1",
//                     style: TextStyle(fontSize: 20, color: Colors.white,),
//                   ),
//                 ],
//               ),
//             ],
//           ),
//         ),
//     );
//   }
// }




import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class StdProfile extends StatelessWidget {
  const StdProfile({Key? key}) : super(key: key);

  // Define a function to load the data from the API endpoint
  Future<Map<String, dynamic>> fetchData() async {
    var headers = {
      'Content-Type': 'application/json',
      'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJTVFdIQzMiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTY4MjMyMjE4NH0.RxboMDMwPw1gp1Zy2W5VI3HJBOkIsFfatvniybhcewo'
    };
    var request = http.Request('GET', Uri.parse('http://10.0.2.2:3000/api/users/me'));
    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();
    if (response.statusCode == 200) {
      String data =await response.stream.bytesToString();
      print(data);
      return jsonDecode(await response.stream.bytesToString());
    }
    else {
      print(await response.stream.bytesToString());
      return jsonDecode(await response.stream.bytesToString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: FutureBuilder(
        future: fetchData(),
        builder: (BuildContext context, AsyncSnapshot<Map<String, dynamic>> snapshot) {
          if (snapshot.hasData) {
            // If data is loaded successfully, display it in the widget
            final data = snapshot.data!;
            return Container(
              width: double.infinity,
              height: 150,
              decoration: const BoxDecoration(
                color: Color.fromARGB(255, 98, 200, 255),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(8.0),
                  bottomRight: Radius.circular(8.0),
                  topLeft: Radius.circular(8.0),
                  topRight: Radius.circular(8.0),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const CircleAvatar(
                    maxRadius: 50.0,
                    minRadius: 50.0,
                    backgroundColor: Colors.cyan,
                    backgroundImage: AssetImage("assets/Hello.jpeg"),
                  ),
                  const SizedBox(
                    width: 20.0,
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "$data",
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                      Text(
                        "$data",
                        style: const TextStyle(fontSize: 20, color: Colors.white,),
                      ),
                    ],
                  ),
                ],
              ),
            );
          } else if (snapshot.hasError) {
            // If an error occurs while loading the data, display an error message
            return const Text('Failed to load data');
          } else {
            // If data is still loading, display a loading indicator
            return const CircularProgressIndicator();
          }
        },
      ),
    );
  }
}

