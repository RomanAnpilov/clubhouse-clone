/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type BackButtonProps = {
  title: string;
  href: string;
};

export const BackButton: React.FC<BackButtonProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <div className="d-flex cup">
        <img
          height={25}
          width={25}
          src="/static/back-arrow.png"
          alt="Back arrow"
          className="mr-10"
        />
        <h3 className="mt-0">{title}</h3>
      </div>
    </Link>
  );
};
