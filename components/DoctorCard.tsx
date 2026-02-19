import Image from 'next/image';

interface DoctorProps {
  name: string;
  role?: string;
  imageUrl?: string;
}

export default function DoctorCard({
  name,
  role,
  imageUrl,
}: DoctorProps) {
  const finalImage =
    imageUrl || 'https://via.placeholder.com/600x800?text=Doctor';

  return (
    <article className="doctor-card">
      <div className="doctor-card__image-wrapper">
        <Image
          src={finalImage}
          alt={name}
          fill
          className="doctor-card__image"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        <div className="doctor-card__overlay" />

        <div className="doctor-card__text">
          <h3 className="doctor-card__name">{name}</h3>
          {role && (
            <p className="doctor-card__role">{role}</p>
          )}
        </div>
      </div>
    </article>
  );
}
