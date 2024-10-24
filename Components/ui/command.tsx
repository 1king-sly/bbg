// 'use client';

// import * as React from 'react';
// import { type DialogProps } from '@radix-ui/react-dialog';
// import { Command as CommandPrimitive } from 'cmdk'; // Command primitive from cmdk
// import { Search } from 'lucide-react'; // Icon

// import { cn } from '@/lib/utils'; // Utility for combining class names
// import { Dialog, DialogContent } from '@/Components/ui/dialog'; // Custom Dialog components

// // Main Command component
// const Command = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive> & React.HTMLAttributes<HTMLDivElement> // Extend props to include HTMLAttributes for className
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive
//     ref={ref}
//     className={cn(
//       'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
//       className
//     )}
//     {...props}
//   />
// ));
// Command.displayName = CommandPrimitive.displayName;

// // Dialog for the Command component
// type CommandDialogProps = DialogProps;

// const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
//   return (
//     <Dialog {...props}>
//       <DialogContent className="overflow-hidden p-0 shadow-lg">
//         <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
//           {children}
//         </Command>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // Input component
// const CommandInput = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Input>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & React.InputHTMLAttributes<HTMLInputElement> // Extend for input HTML props
// >(({ className, ...props }, ref) => (
//   <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
//     <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
//     <CommandPrimitive.Input
//       ref={ref}
//       className={cn(
//         'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
//         className
//       )}
//       {...props}
//     />
//   </div>
// ));
// CommandInput.displayName = CommandPrimitive.Input.displayName;

// // List component
// const CommandList = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.List>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & React.HTMLAttributes<HTMLUListElement> // Extend for <ul> props
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive.List
//     ref={ref}
//     className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
//     {...props}
//   />
// ));
// CommandList.displayName = CommandPrimitive.List.displayName;

// // Empty state component
// const CommandEmpty = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Empty>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & React.HTMLAttributes<HTMLDivElement> // Extend for <div>
// >((props, ref) => (
//   <CommandPrimitive.Empty
//     ref={ref}
//     className={cn('py-6 text-center text-sm', props.className)}
//     {...props}
//   />
// ));
// CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// // Group component
// const CommandGroup = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Group>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & React.HTMLAttributes<HTMLDivElement> // Extend for <div>
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive.Group
//     ref={ref}
//     className={cn(
//       'overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
//       className
//     )}
//     {...props}
//   />
// ));
// CommandGroup.displayName = CommandPrimitive.Group.displayName;

// // Separator component
// const CommandSeparator = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Separator>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & React.HTMLAttributes<HTMLDivElement> // Extend for <div>
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive.Separator
//     ref={ref}
//     className={cn('-mx-1 h-px bg-border', className)}
//     {...props}
//   />
// ));
// CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// // Item component
// const CommandItem = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & React.HTMLAttributes<HTMLDivElement> // Extend for <div>
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive.Item
//     ref={ref}
//     className={cn(
//       'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected="true"]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50',
//       className
//     )}
//     {...props}
//   />
// ));
// CommandItem.displayName = CommandPrimitive.Item.displayName;

// // Shortcut component
// const CommandShortcut = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLSpanElement>) => {
//   return (
//     <span
//       className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
//       {...props}
//     />
//   );
// };
// CommandShortcut.displayName = 'CommandShortcut';

// export {
//   Command,
//   CommandDialog,
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
//   CommandShortcut,
//   CommandSeparator,
// };


import React from 'react'

export default function command() {
  return (
    <div>command</div>
  )
}
