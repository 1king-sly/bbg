import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const organizations = [
  {
    name: "TechGirls Kenya",
    description: "Empowering girls through technology education and mentorship.",
    website: "https://techgirlskenya.org",
    contact: "info@techgirlskenya.org"
  },
  {
    name: "Young Mothers Support Network",
    description: "Providing resources and support for teenage mothers.",
    website: "https://youngmotherssupport.org",
    contact: "support@youngmotherssupport.org"
  },
  {
    name: "Girls' Rights Initiative",
    description: "Advocating for girls' rights and gender equality in education.",
    website: "https://girlsrightsinitiative.org",
    contact: "info@girlsrightsinitiative.org"
  }
];

export default function OrganizationsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Partner Organizations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{org.description}</p>
              <p><strong>Website:</strong> <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{org.website}</a></p>
              <p><strong>Contact:</strong> {org.contact}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}