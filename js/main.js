(() => {

    function getItemsData() {
        let LSData = localStorage.getItem('Студенты');
        if (LSData) return JSON.parse(LSData);
        else return [];
    }

    //создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        const appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createStudentsForm() {
        const form = document.createElement('form');
        const inputName = document.createElement('input');
        inputName.className = 'input';
        inputName.name = 'firstname';
        // inputName.value = 'Алексей';
        inputName.placeholder = 'Имя';
        const inputSurname = document.createElement('input');
        inputSurname.placeholder = 'Фамилия';
        // inputSurname.value = 'Шингарев';
        inputSurname.name = 'surname';
        const inputMiddleName = document.createElement('input');
        // inputMiddleName.value = 'Сергеевич';
        inputMiddleName.placeholder = 'Отчество';
        inputMiddleName.name = 'middlename';
        const inputBirthDate = document.createElement('input');
        inputBirthDate.name = 'birthdate';
        // inputBirthDate.setAttribute('data-rule', 'date');
        inputBirthDate.id = 'birthDate';
        inputBirthDate.type = 'date';
        inputBirthDate.placeholder = 'Дата рождения';
        const error = document.createElement('div');
        error.id = 'error';
        const inputStartStudyYear = document.createElement('input');
        inputStartStudyYear.placeholder = 'Год начала обучения';
        inputStartStudyYear.name = 'startstudyyear';
        // inputStartStudyYear.value = '2016';
        inputStartStudyYear.type = 'number';
        const inputFaculty = document.createElement('input');
        inputFaculty.placeholder = 'Факультет';
        inputFaculty.name = 'faculty';
        // inputFaculty.value = 'Skillbox';
        const button = document.createElement('button');
        button.textContent = 'Добавить Студента';
        button.id = 'btn';
        button.type = 'submit'


        form.classList.add('d-flex', 'flex-column', 'col-lg-3', 'mx-auto', 'mb-3');
        button.classList.add('btn', 'btn-dark');
        button.disabled = true;

        const inputDataFilter = document.createElement('input');
        inputDataFilter.id = 'filter-name';
        inputDataFilter.className = 'form__filter__by-name'
        inputDataFilter.placeholder = 'введите имя для сортировки';

        const inputBirthDateFilter = document.createElement('input');
        inputBirthDateFilter.id = 'filter-date';
        inputBirthDateFilter.className = 'form__filter__by-date';
        inputBirthDateFilter.type = 'date';
        inputBirthDateFilter.placeholder = 'введите дату рождения сортировки';

        const inputDatesStudy = document.createElement('input');
        inputDatesStudy.id = 'filter-year';
        inputDatesStudy.className = 'form__filter__by-year';
        inputDatesStudy.type = 'number';
        inputDatesStudy.placeholder = 'введите годы обучения';

        const inputFilterFaculty = document.createElement('input');
        inputFilterFaculty.id = 'filter-faculty';
        inputFilterFaculty.className = 'form__filter__by-faculty';
        inputFilterFaculty.placeholder = 'введите факультет';

        form.append(inputName, inputSurname, inputMiddleName, inputBirthDate, inputStartStudyYear,
            inputFaculty, button, inputDataFilter, inputBirthDateFilter, inputDatesStudy, inputFilterFaculty, error)

        return {
            form,
            inputName,
            inputSurname,
            inputMiddleName,
            inputBirthDate,
            inputStartStudyYear,
            inputFaculty,
            error,
            button
        };
    }


    function createTable() {
        const table = document.createElement('table');
        table.id = "table";
        const tbody = document.createElement('tbody');
        tbody.id = 'table-body';
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const thName = document.createElement('th');
        thName.id = 'thName';
        const thBirthDate = document.createElement('th');
        thBirthDate.id = 'thBirthDate';
        const thStartStudyYear = document.createElement('th');
        thStartStudyYear.id = 'thStartStudyYear';
        const thFaculty = document.createElement('th');
        thFaculty.id = 'thFaculty';

        table.classList.add('table');

        table.append(thead, tbody);
        thead.append(tr);
        tr.append(thName, thBirthDate, thStartStudyYear, thFaculty);

        thName.textContent = 'ФИО Студента';
        thBirthDate.textContent = 'Дата рождения';
        thStartStudyYear.textContent = 'Год начала обучения';
        thFaculty.textContent = 'Факультет';

        return {
            table,
            tbody
        };
    }



    function getNewRow(student) {


        let newStudent = {
            fullName: student.surname + ' ' + student.firstname + ' ' + student.middlename,
            dateOfBirth: student.birthdate,
            startsYear: student.startstudyyear,
            faculty: student.faculty,
        }


        function getStudentsAge() {
            let now = new Date(); //Текущя дата 
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
            let dateOfBirth = new Date(newStudent.dateOfBirth); //Введенная дата рождения без времени
            let dobThisYear = new Date(today.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
            let age = today.getFullYear() - dateOfBirth.getFullYear();
            let lessAge = age - 1;

            if (today > dobThisYear) {
                return age;
            } else {
                return lessAge;
            }

        }
        const studentsAge = getStudentsAge();

        newStudent.dateOfBirth = student.birthdate + ' ' + '(' + studentsAge + ' ' + 'лет' + ')';

        let studyYearStarts = Number(student.startstudyyear);
        let studyYearEnds = studyYearStarts + 5;

        function getStudentsLevel() {

            let now = new Date(); //Текущя дата
            let studyMonthEnds = now.getMonth();
            let currentYear = now.getFullYear();
            let ageResult = currentYear - studyYearStarts;

            if (studyYearEnds === currentYear && studyMonthEnds > 9 || studyYearStarts < (currentYear - 5)) {
                return 'Закончил';
            } else {
                return ageResult;
            }
        }

        const studentsLevel = getStudentsLevel();

        newStudent.startsYear = student.startstudyyear + '-' + studyYearEnds + ' ' + '(' + studentsLevel + ' курс' + ')';


        let row = document.createElement('tr');

        for (let data of Object.values(newStudent)) {
            let column = document.createElement('td');
            column.textContent = data;
            row.append(column);
        }
        return row
    }

    function createStudentsApp(container, title) {
        const studentsForm = createStudentsForm();
        const studentsTable = createTable();
        const studentsAppTitle = createAppTitle(title);
        const students = getItemsData();


        container.append(studentsAppTitle, studentsForm.form, studentsTable.table);

        studentsForm.form.addEventListener('input', function () {
            if (!studentsForm.inputName.value || !studentsForm.inputSurname.value ||
                !studentsForm.inputMiddleName.value || !studentsForm.inputBirthDate.value ||
                !studentsForm.inputStartStudyYear.value || !studentsForm.inputFaculty.value ||
                studentsForm.inputBirthDate.value < new Date('01/01/1900') ||
                studentsForm.inputBirthDate.value > new Date()) {
                studentsForm.button.disabled = true;
            } else {
                studentsForm.button.disabled = false;
            }

            function validateBirth() {
                let input = studentsForm.inputBirthDate;
                let today = new Date();
                let inputedBirhtdate = new Date(studentsForm.inputBirthDate.value);
                let minDate = new Date('01/01/1900');



                input.onblur = function () {
                    if (inputedBirhtdate > minDate && inputedBirhtdate < today) {
                        input.classList.add('valid');
                    } else {
                        input.classList.add('invalid');
                        input.value = '';
                        error.innerHTML = 'Пожалуйста, введите верную дату рождения!';
                        studentsForm.button.disabled = true;
                    }
                }

                input.onfocus = function () {
                    if (this.classList.contains('invalid')) {
                        // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
                        this.classList.remove('invalid');
                        error.innerHTML = "";
                    }
                }
            }

            const valideteBirth = validateBirth();

            function validateStartStudyYear() {
                let input = studentsForm.inputStartStudyYear;
                let today = new Date();
                let currentYear = today.getFullYear();
                let inputedStart = Number(studentsForm.inputStartStudyYear.value);
                let minDate = new Date('01/01/2000');
                let minDateYear = minDate.getFullYear();


                input.onblur = function () {
                    if (inputedStart > minDateYear && inputedStart < currentYear) {
                        input.classList.add('valid');
                    } else {
                        input.classList.add('invalid');
                        input.value = '';
                        error.innerHTML = 'Пожалуйста, введите верный год начала обучения!';
                        studentsForm.button.disabled = true;
                    }
                }

                input.onfocus = function () {
                    if (this.classList.contains('invalid')) {
                        // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
                        this.classList.remove('invalid');
                        error.innerHTML = "";
                    }
                }
            }

            validateStartStudyYear();
        })


        students.forEach(student => {
            let newRow = getNewRow(student);
            studentsTable.tbody.append(newRow);
        })


        studentsForm.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(studentsForm.form);

            const student = {};

            for (const [name, value] of formData) {
                student[name] = value;
            }

            let newRow = getNewRow(student);
            studentsTable.tbody.append(newRow);

            students.push(student);

            localStorage.setItem('Студенты', JSON.stringify(students));

            studentsForm.form.reset();
            studentsForm.button.disabled = true;

        })




        const headers = studentsTable.table.querySelectorAll('th');
        const tableBody = studentsTable.table.querySelector('tbody');
        const rows = tableBody.querySelectorAll('tr');


        // Направление сортировки
        const directions = Array.from(headers).map(function (header) {
            return '';
        });

        // Преобразовать содержимое данной ячейки в заданном столбце
        const transform = function (index, content) {
            // Получить тип данных столбца
            const type = headers[index].getAttribute('data-type');
            switch (type) {
                case 'number':
                    return parseFloat(content);
                case 'string':
                default:
                    return content;
            }
        };

        const sortColumn = function (index) {
            // Получить текущее направление
            const direction = directions[index] || 'asc';

            // Фактор по направлению
            const multiplier = (direction === 'asc') ? 1 : -1;

            const newRows = Array.from(rows);

            newRows.sort(function (rowA, rowB) {
                const cellA = rowA.querySelectorAll('td')[index].innerHTML;
                const cellB = rowB.querySelectorAll('td')[index].innerHTML;

                const a = transform(index, cellA);
                const b = transform(index, cellB);

                switch (true) {
                    case a > b: return 1 * multiplier;
                    case a < b: return -1 * multiplier;
                    case a === b: return 0;
                }
            });

            // Удалить старые строки
            [].forEach.call(rows, function (row) {
                tableBody.removeChild(row);
            });

            // Поменять направление
            directions[index] = direction === 'asc' ? 'desc' : 'asc';

            // Добавить новую строку
            newRows.forEach(function (newRow) {
                tableBody.appendChild(newRow);
            });
        };

        [].forEach.call(headers, function (header, index) {
            header.addEventListener('click', function () {
                sortColumn(index);
            });
        });

        const filterByName = function () {

            const checkFilterName = function () {
                let inputFilteredName = document.getElementById('filter-name');
                let print;


                inputFilteredName.addEventListener('keyup', function () {
                    clearTimeout(print);
                    print = setTimeout(function () {
                        let filter = inputFilteredName.value.toLocaleLowerCase(),
                            filterElements = document.querySelectorAll('#table-body tr');

                        filterElements.forEach(item => {
                            if (item.innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {
                                item.style.display = '';
                            } else {
                                item.style.display = 'none';
                            }
                        })
                    }, 700);
                })
            }

            checkFilterName();

            const checkFilterBirth = function () {
                let inputFilteredBirth = document.getElementById('filter-date');
                inputFilteredBirth.addEventListener('keyup', function () {
                    clearTimeout(print);
                    print = setTimeout(function () {
                        let filter = inputFilteredBirth.value,
                            filterBirthElements = document.querySelectorAll('#table-body tr');

                        filterBirthElements.forEach(item => {
                            if (item.innerHTML.indexOf(filter) > -1) {
                                item.style.display = '';
                            } else {
                                item.style.display = 'none';
                            }
                        })
                    }, 700);
                })

            }

            checkFilterBirth();

            const checkFilterDate = function () {
                let inputFilteredDate = document.getElementById('filter-year');

                inputFilteredDate.addEventListener('keyup', function () {
                    clearTimeout(print);
                    print = setTimeout(function () {

                        let filter = inputFilteredDate.value;
                        filterDateElements = document.querySelectorAll('#table-body tr');

                        filterDateElements.forEach(item => {
                            if (item.cells[2].innerHTML.indexOf(filter) > -1) {
                                item.style.display = '';
                            } else {
                                item.style.display = 'none';
                            }
                        })
                    }, 700);
                })

            }

            checkFilterDate();

            const checkFilterFaculty = function () {
                let inputFilteredFaculty = document.getElementById('filter-faculty');
                inputFilteredFaculty.addEventListener('keyup', function () {
                    clearTimeout(print);
                    print = setTimeout(function () {
                        let filter = inputFilteredFaculty.value.toLocaleLowerCase(),
                            filterFacultyElements = document.querySelectorAll('#table-body tr');

                        filterFacultyElements.forEach(item => {
                            if (item.innerHTML.toLocaleLowerCase().indexOf(filter) > -1) {
                                item.style.display = '';
                            } else {
                                item.style.display = 'none';
                            }
                        })
                    }, 700);
                })
            }

            checkFilterFaculty();
        }

        filterByName();

    }


    window.createStudentsApp = createStudentsApp;
})()
