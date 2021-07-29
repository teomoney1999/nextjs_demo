import { Fragment } from "react";
import Head from 'next/head'; 
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";


function HomePage(props) {


  return (
    <Fragment>
      <Head>
        <title>NextJS Meetup</title>
        <meta name='description' content='Just a little practice about NextJS' />
      </Head>
      <MeetupList meetups={props.meetups || []} />
    </Fragment>
    
  );
}

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect('mongodb+srv://teomoney:l4kqMSCaMDHvTdT1@teomoneycluster.9dr3f.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db(); 

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title, 
        address: meetup.address, 
        image: meetup.address,
        id: meetup._id.toString(),
      }))
    }, 
    revalidate: 1
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req; 
//   const res = context.res; 

//   return {
//     props: MEETUPS
//   }
// }

export default HomePage;
