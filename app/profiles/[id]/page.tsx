import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Profiles array for static data
const girlProfiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 16,
    location: "Nairobi",
    bio: "Aspiring software developer and tech enthusiast.",
    interests: ["Coding", "Reading", "Photography"],
    achievements: ["Won local coding competition", "Started a tech club at school"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    age: 18,
    location: "Mombasa",
    bio: "Young mother passionate about education and child care.",
    interests: ["Parenting", "Education", "Cooking"],
    achievements: ["Completed high school while raising a child", "Started a support group for teen mothers"],
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  }
];

// Dynamic page component
export default function GirlProfile({ params }: { params: { id: string } }) {
  const profile = girlProfiles.find(p => p.id === parseInt(params.id));

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle>{profile.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <h3 className="font-semibold mt-4">Interests</h3>
          <ul className="list-disc list-inside">
            {profile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Achievements</h3>
          <ul className="list-disc list-inside">
            {profile.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// Function to predefine the available profile IDs for static generation
export function generateStaticParams() {
  return girlProfiles.map((profile) => ({
    id: profile.id.toString(),
  }));
}
