import Image from 'next/image';
export default function Avatar({ name, picture }) {
  return (
    <div className="d-flex align-items-center">
      <div className='flex-shrink-0 size-40 rounded-circle me-3'>
      <Image
        src={picture}
        width={256}
        height={256}
        className="rounded-circle"
        alt={name} layout="responsive"
      />
      </div>
      <div className="fw-semibold small">{name}</div>
    </div>
  );
}
