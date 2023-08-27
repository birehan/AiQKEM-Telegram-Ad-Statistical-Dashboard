import { AiFillStar } from "react-icons/ai";

const ReviewCard = () => {
  return (
    <div className="w-[80%] md:w-fit bg-white rounded-xl shadow-md pl-8 pr-36 py-8 flex flex-row  relative justify-between gap-2">
      <div className="flex flex-col gap-4 w-fit flex-6">
        <div className="flex items-center w-fit">
          <div className="flex-shrink-0">
            <img
              className="h-16 w-16 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="profile"
            />
          </div>
          <div className="ml-4">
            <h3 className=" font-semibold leading-6 text-gray-900 text-xl">
              John Sena
            </h3>
            <p className="text-sm text-gray-500 mt-1">2 days ago</p>
          </div>
        </div>

        <p className="w-60 sm:w-64 lg:w-80">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
        </p>

        <div className="flex flex-row gap-4 items-center justify-start">
          <div className="flex flex-row gap-2 items-center justify-center">
            <AiFillStar color="#f7c604" size="25" />
            <AiFillStar color="#f7c604" size="25" />
            <AiFillStar color="#f7c604" size="25" />
            <AiFillStar color="#f7c604" size="25" />
            <AiFillStar color="#b8bcbf" size="25" />
          </div>
          <p className="text-md">4</p>
        </div>
      </div>

      <div className="absolute right-[-20%] flex items-center justify-center top-0 bottom-0">
        <img
          src="/assets/images/dish2.png"
          alt="food"
          className="h-44 w-44 md:h-52 md:w-52 xl:h-56 xl:w-56 flex items-center"
          style={{ border: "0px solid green", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default ReviewCard;
