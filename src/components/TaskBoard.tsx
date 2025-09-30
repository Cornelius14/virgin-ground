import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import TaskColumn, { Column } from './TaskColumn';
import { Task } from './TaskCard';

// Initial data for the task board
const initialColumns: Column[] = [
  {
    id: 'prospects',
    title: 'Prospects',
    color: 'muted',
    tasks: [
      {
        id: 't1',
        title: '850 Market St, Denver CO',
        description: 'Mixed-use building, 42 units | Owner: Thompson Properties LLC',
        tag: { color: 'blue', label: 'Multifamily' },
        dueDate: 'Jun 5',
        assignees: 2,
        progress: { completed: 1, total: 4 }
      },
      {
        id: 't2',
        title: '1200 Industrial Blvd, Phoenix AZ',
        description: '85,000 SF warehouse | Owner: Redwood Capital Group',
        tag: { color: 'purple', label: 'Industrial' },
        dueDate: 'Jun 8',
        assignees: 1,
        progress: { completed: 0, total: 3 }
      },
      {
        id: 't3',
        title: '430 Retail Plaza, Austin TX',
        description: '28,000 SF shopping center | Owner: Heritage Investments',
        tag: { color: 'green', label: 'Retail' },
        dueDate: 'Jun 10',
        assignees: 2,
        progress: { completed: 2, total: 5 }
      },
      {
        id: 't4',
        title: '2100 Office Park Dr, Seattle WA',
        description: '120,000 SF Class A office | Owner: Cascade Real Estate Fund',
        tag: { color: 'orange', label: 'Office' },
        dueDate: 'Jun 12',
        assignees: 1,
        progress: { completed: 0, total: 4 }
      }
    ]
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'blue',
    tasks: [
      {
        id: 't5',
        title: '3400 Commerce Ave, Dallas TX',
        description: '156 units, 1995 build | Contact: Sarah Martinez, Skyline Partners',
        tag: { color: 'blue', label: 'Multifamily' },
        dueDate: 'Jun 3',
        assignees: 2,
        progress: { completed: 3, total: 5 }
      },
      {
        id: 't6',
        title: '750 Logistics Center, Charlotte NC',
        description: '200,000 SF distribution facility | Contact: Michael Chen, Horizon Industrial',
        tag: { color: 'purple', label: 'Industrial' },
        dueDate: 'Jun 4',
        assignees: 1,
        progress: { completed: 4, total: 6 }
      },
      {
        id: 't7',
        title: '5200 Downtown Plaza, Nashville TN',
        description: '65,000 SF retail center | Contact: David Rodriguez, Urban Retail Ventures',
        tag: { color: 'green', label: 'Retail' },
        dueDate: 'Jun 6',
        assignees: 2,
        progress: { completed: 5, total: 7 }
      }
    ]
  },
  {
    id: 'booked',
    title: 'Booked',
    color: 'accent',
    tasks: [
      {
        id: 't8',
        title: '920 Midtown Residences, Boston MA',
        description: '88 units, value-add opportunity | Meeting: June 1, 2:00 PM with Jennifer Park',
        tag: { color: 'blue', label: 'Multifamily' },
        dueDate: 'Jun 1',
        assignees: 2,
        progress: { completed: 7, total: 8 }
      },
      {
        id: 't9',
        title: '1800 Tech Park Dr, Raleigh NC',
        description: '145,000 SF flex industrial | Meeting: June 2, 10:00 AM with Robert Thompson',
        tag: { color: 'purple', label: 'Industrial' },
        dueDate: 'Jun 2',
        assignees: 1,
        progress: { completed: 6, total: 6 }
      }
    ]
  }
];

interface TaskBoardProps {
  className?: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ className }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragSourceColumn, setDragSourceColumn] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTaskDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id);
    setDraggedTask(task);
    
    // Find source column
    const sourceColumn = columns.find(col => 
      col.tasks.some(t => t.id === task.id)
    );
    
    if (sourceColumn) {
      setDragSourceColumn(sourceColumn.id);
      e.dataTransfer.setData('sourceColumnId', sourceColumn.id);
    }
  };

  const handleTaskDragEnd = () => {
    setDraggedTask(null);
    setDragSourceColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Handle drag leave logic if needed
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (!taskId || !sourceColumnId || sourceColumnId === targetColumnId) {
      return;
    }
    
    // Update columns state
    const newColumns = columns.map(column => {
      // Remove task from source column
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      
      // Add task to target column
      if (column.id === targetColumnId) {
        const taskToMove = columns.find(col => col.id === sourceColumnId)?.tasks.find(task => task.id === taskId);
        if (taskToMove) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove]
          };
        }
      }
      
      return column;
    });
    
    setColumns(newColumns);
    
    // Show a toast notification
    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (targetColumn && draggedTask) {
      toast({
        title: "Deal moved",
        description: `${draggedTask.title} moved to ${targetColumn.title}`,
      });
    }
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    // This function can be used for programmatic status changes (not used in this implementation)
  };

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onTaskDragStart={handleTaskDragStart}
          onTaskDragEnd={handleTaskDragEnd}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskBoard;