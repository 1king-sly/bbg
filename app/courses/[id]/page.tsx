import ClientCoursePage from './ClientCoursePage';

export async function generateStaticParams() {
  
    const courseIds = [{ id: '1' }, { id: '2' }, { id: '3' }];
    return courseIds.map((course) => ({
        id: course.id,
    }));
}

export default function CoursePage({ params }: { params: { id: string } }) {
    const { id } = params

    return (
        <div>
            <h1>Course Page for {id}</h1>
            <ClientCoursePage courseId={id} />
        </div>
    );
}
