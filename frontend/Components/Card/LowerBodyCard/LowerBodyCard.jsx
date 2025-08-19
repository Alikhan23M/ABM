import {
    Card,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  
  const LowerBodyCard = () => {
    return (
      <div className="flex justify-start bg-transparent w-full items-center h-full">
        <Card className="w-full bg-white shadow-none">
          <CardHeader className="bg-transparent p-4 rounded-t-lg">
            <Typography variant="h4" className="text-black mt-[4vh] text-start">
            Association for Biorisk Management-Pakistan is a registered Non Governmental, non for Profit organization. 
            </Typography>
            <Typography variant='h6' className="text-gray-800 text-start mt-2">
            The Association for Biorisk Management effectively contributes to identify, evaluate and manage deficiencies in BRM system through its assessment, capacity building, awareness, advocacy and lobbying programs and will contribute to managing the potential pathological hazards and threats involving and encompassing all the related fields and stakeholders.
            </Typography>
          </CardHeader>
        </Card>
      </div>
    );
  };
  
  export default LowerBodyCard;
  