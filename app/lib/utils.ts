export const parseDate = (dateStr: string): Date => {
    const months: { [key: string]: number } = {
      'Janvier': 0, 'Février': 1, 'Mars': 2, 'Avril': 3, 'Mai': 4, 'Juin': 5,
      'Juillet': 6, 'Août': 7, 'Septembre': 8, 'Octobre': 9, 'Novembre': 10, 'Décembre': 11
    };
    const [day, monthName, year] = dateStr.split(' ');
    if (!months.hasOwnProperty(monthName)) {
        return new Date(NaN); // Retourne une date invalide si le mois n'est pas bon
    }
    return new Date(parseInt(year), months[monthName], parseInt(day));
  };
