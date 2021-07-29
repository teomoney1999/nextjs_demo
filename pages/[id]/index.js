import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      // id="m1"
      // title="A First Meetup"
      // image="https://www.sydney.com/sydney-life/wp-content/uploads/2016/03/Jacarandas-The-Rocks.jpg"
      // address="Somewhere far away"
      // description="This is a first meetup!"
      {...props}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://teomoney:l4kqMSCaMDHvTdT1@teomoneycluster.9dr3f.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db(); 

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
  console.log('meetups', meetups);
  client.close();
  return {
    paths: meetups.map(meetup => ({
      params: {id: meetup._id.toString()}
    })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const {id} = context.params;
  console.log("id", id);
  const client = await MongoClient.connect(
    'mongodb+srv://teomoney:l4kqMSCaMDHvTdT1@teomoneycluster.9dr3f.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db(); 

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({_id: ObjectId(id)});
  console.log('meetup', meetup);
  client.close();
  // Fetch data for a single meetup

  return {
    props: {
      id: meetup._id.toString(), 
      title: meetup.title, 
      address: meetup.address, 
      image: meetup.image, 
      description: meetup.description,
    }
  }
}

export default MeetupDetails;
