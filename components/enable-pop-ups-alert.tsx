import { AlertTriangleIcon, XIcon } from "lucide-react";

export const EnablePopUpsAlert = ({
  setShouldShowEnablePopUpsAlert,
  setUserHasClosedAlert,
}: {
  setShouldShowEnablePopUpsAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setUserHasClosedAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="group pointer-events-auto relative mb-6 flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-neutral-200 bg-white p-6 pr-8 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center gap-4">
        <AlertTriangleIcon className="h-6 w-6 shrink-0" />
        <div className="grid gap-1">
          <div className="text-sm opacity-90">
            To open multiple links, please enable popups for this site. Without
            popups enabled, only one link will open.
          </div>
        </div>
        <button
          className="hover:text-neutral-950focus:outline-none absolute right-2 top-2 rounded-md p-1 text-neutral-950/50 focus:ring-2 focus:ring-neutral-950 dark:text-neutral-50/50 dark:hover:text-neutral-50 dark:focus:ring-neutral-300"
          onClick={() => {
            setShouldShowEnablePopUpsAlert(false);
            setUserHasClosedAlert(true);
          }}
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
