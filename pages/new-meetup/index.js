import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addHandler(meetupData) {

    const response = await fetch('/api/new-meetup', {
      method: 'POST', 
      body: JSON.stringify(meetupData), 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json(); 

    router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addHandler} />;
}

export default NewMeetupPage;
