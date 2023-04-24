import 'package:flutter/material.dart';
import '../profile_display.dart';

class NewProfile extends StatelessWidget {
  const NewProfile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Profile"),
        // centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const StdProfile(),
            const SizedBox(
              height: 20.0,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: const [
                ProfileDetailRow(title: 'Registration Number', value: '1234567'),
                ProfileDetailRow(title: 'Academic Year', value: '2022-2023'),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: const [
                ProfileDetailRow(title: 'Admission Class', value: 'Grade 1 A1'),
                ProfileDetailRow(title: 'Date Of Admission', value: '2006-01-01'),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: const [
                ProfileDetailRow(title: 'Sex', value: 'Other'),
                ProfileDetailRow(title: 'Date Of Birth', value: '2001-06-08'),
              ],
            ),
            const SizedBox(
              height: 20,
            ),
            const ProfileDetailColumn(
                title: 'Email', value: 'buddhimawije@gmail.com'),
            const ProfileDetailColumn(
                title: 'Contact Number', value: '075-296-0892'),
            const ProfileDetailColumn(
                title: 'Name of Mother/Father/Guardian', value: 'Thissa Wijesooriya'),
            const ProfileDetailColumn(
                title: 'Contact Number', value: '074-152-0086'),
          ],
        ),
      ),
    );
  }
}

class ProfileDetailRow extends StatelessWidget {
  const ProfileDetailRow({Key? key, required this.title, required this.value})
      : super(key: key);
  final String title;
  final String value;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width / 2,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: Theme.of(context)
                    .textTheme
                    .titleMedium!
                    .copyWith(color: Colors.black, fontSize: 15.0),
              ),
              const SizedBox(height: 10.0),
              Text(value, style: Theme.of(context).textTheme.bodySmall),
              const SizedBox(height: 10.0),
              SizedBox(
                width: MediaQuery.of(context).size.width / 3,
                child: const Divider(
                  thickness: 1.0,
                ),
              ),
            ],
          ),
          const Icon(
            Icons.lock_outline,
            size: 10.0,
          ),
        ],
      ),
    );
  }
}

class ProfileDetailColumn extends StatelessWidget {
  const ProfileDetailColumn(
      {Key? key, required this.title, required this.value})
      : super(key: key);
  final String title;
  final String value;
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium!.copyWith(
                    color: Colors.black,
                    fontSize: 15.0,
                  ),
            ),
            const SizedBox(height: 10.0),
            Text(value, style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 10.0),
            SizedBox(
              width: MediaQuery.of(context).size.width / 1.1,
              child: const Divider(
                thickness: 1.0,
              ),
            )
          ],
        ),
        const Icon(
          Icons.lock_outline,
          size: 10.0,
        ),
      ],
    );
  }
}
