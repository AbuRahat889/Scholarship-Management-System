
const SectionTitle = ({subtitle, titel}) => {
    return (
        <div className="containar mx-auto  mt-10 flex flex-col gap-5 items-center"> 
            <h3 className="font-semibold bg-red-100 w-40 p-2 text-center border-t-4 border-red-500 text-red-500">{subtitle}</h3>
        <h1 className="text-5xl font-bold">{titel}</h1>
        </div>
    );
};

export default SectionTitle;