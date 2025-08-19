import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const UpperBodyCard = () => {
  return (
    <div className="flex justify-start bg-transparent w-full items-center h-full">
      <Card className="w-full bg-white shadow-none">
        <CardHeader className="bg-transparent p-4 rounded-t-lg">
          <Typography variant="h4" className="text-black mt-[4vh] text-start">
          Welcome to Association for Biorisk Management
          </Typography>
          <Typography variant='h6' className="text-gray-800 text-start mt-2">
          Delivers Innovative, Sustainable Solutions to the Biorisk Challenges in Pakistan
          </Typography>
        </CardHeader>
      </Card>
    </div>
  );
};

export default UpperBodyCard;

