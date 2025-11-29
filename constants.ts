import { Homework, HomeworkStatus, UserProfile } from './types';

export const CURRENT_USER: UserProfile = {
  name: "Александр Иванов",
  group: "RPO-22",
  avatar: "https://picsum.photos/100/100",
  coins: 1450,
  crystals: 32,
  email: "alex.ivanov@student.top-academy.ru",
  phone: "+7 (999) 123-45-67",
  github: "github.com/alex-dev",
  dob: "2003-05-15"
};

export const MOCK_HOMEWORK: Homework[] = [
  {
    id: 'hw-1',
    subject: 'Системное программирование',
    topic: 'Многопоточность в C++',
    description: 'Необходимо реализовать приложение, симулирующее работу кассы в супермаркете с использованием std::thread и std::mutex. Обратите внимание на синхронизацию потоков при доступе к общим ресурсам.',
    dateAssigned: '2024-05-20T10:00:00',
    dateDeadline: '2024-05-27T23:59:00',
    status: HomeworkStatus.ASSIGNED,
    teacher: {
      id: 't-1',
      name: 'Петров В.С.',
      avatar: 'https://picsum.photos/id/101/50/50'
    },
    files: [
      { name: 'lab_manual.pdf', url: '#', size: '1.2 MB' }
    ]
  },
  {
    id: 'hw-2',
    subject: 'Разработка веб-приложений',
    topic: 'React Hooks и State Management',
    description: 'Создать SPA приложение "Список задач" (ToDo List). Требования: добавление, удаление, фильтрация задач. Использовать useState и useEffect. Стилизация через CSS Modules или Tailwind.',
    dateAssigned: '2024-05-18T09:00:00',
    dateDeadline: '2024-05-25T18:00:00',
    status: HomeworkStatus.UPLOADED,
    teacher: {
      id: 't-2',
      name: 'Смирнова Е.А.',
      avatar: 'https://picsum.photos/id/102/50/50'
    }
  },
  {
    id: 'hw-3',
    subject: 'Базы данных',
    topic: 'Нормализация баз данных',
    description: 'Привести предложенную схему БД к третьей нормальной форме (3НФ). Написать SQL скрипт создания таблиц с внешними ключами.',
    dateAssigned: '2024-05-10T14:30:00',
    dateDeadline: '2024-05-17T23:59:00',
    status: HomeworkStatus.CHECKED,
    grade: 12,
    maxGrade: 12,
    comment: 'Отличная работа, связи построены верно.',
    teacher: {
      id: 't-3',
      name: 'Козлов Д.М.',
      avatar: 'https://picsum.photos/id/103/50/50'
    }
  },
  {
    id: 'hw-4',
    subject: 'Английский язык',
    topic: 'Technical English: Hardware',
    description: 'Прочитать текст на стр. 45, выполнить упражнения 1-5. Подготовить пересказ текста.',
    dateAssigned: '2024-05-15T08:30:00',
    dateDeadline: '2024-05-22T08:30:00',
    status: HomeworkStatus.OVERDUE,
    teacher: {
      id: 't-4',
      name: 'Wilson J.',
      avatar: 'https://picsum.photos/id/104/50/50'
    }
  },
   {
    id: 'hw-5',
    subject: 'Паттерны проектирования',
    topic: 'Singleton и Factory Method',
    description: 'Реализовать примеры использования паттернов на C#. Написать unit-тесты для проверки уникальности экземпляра Singleton.',
    dateAssigned: '2024-05-22T10:00:00',
    dateDeadline: '2024-05-29T23:59:00',
    status: HomeworkStatus.ASSIGNED,
    teacher: {
      id: 't-1',
      name: 'Петров В.С.',
      avatar: 'https://picsum.photos/id/101/50/50'
    }
  }
];