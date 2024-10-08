type Props = {
  /**
   * * 円を塗りつぶす色
   */
  variant: "orange" | "green" | "yellow";
};

/**
 * プロジェクトで使用する円です
 */
const Circle = ({ variant }: Props) => {
  let bgColor;

  switch (variant) {
    case "orange":
      bgColor = "bg-orange-500";
      break;
    case "green":
      bgColor = "bg-green-500";
      break;
    case "yellow":
      bgColor = "bg-yellow-500";
      break;
    default:
      break;
  }

  return <div className={`${bgColor} size-14 p-2 rounded-full`}></div>;
};

export default Circle;
