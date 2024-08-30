import { useEffect, useMemo, useState } from "react"

export default function usePagination(data) {
    const questionPerPage = 5;
    const [pageNumber, setPageNumber] = useState(1)

    const indexLastItem = questionPerPage * pageNumber;
    const indexFirstItem = indexLastItem - questionPerPage;

    const [questions, setQuestions] = useState(data.slice(indexFirstItem, indexLastItem));

    useEffect(() => {
        setQuestions(data.slice(indexFirstItem, indexLastItem));
    }, [data, indexFirstItem, indexLastItem]);

    const totalPages = Math.ceil(data.length / questionPerPage);

    const paginationNum = useMemo(() => {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalPages]);

    return{ questions, setPageNumber, pageNumber, totalPages, paginationNum }
}