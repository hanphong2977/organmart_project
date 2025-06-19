import api from "@/services/api";
import { Recipe } from "@/types";

const PAGE_SIZE = 6;
const baseUrl = api.defaults.baseURL!;

// ----- Hàm chuyển đổi dữ liệu raw sang Recipe -----
const mapRecipe = (r: any): Recipe => ({
    id: r.id,
    name: r.name,
    ingredients: r.ingredients,
    instructions: r.instructions,
    image_url: r.image_url ? baseUrl + r.image_url : baseUrl + "/images/default.jpg",
});

// ----- Lấy danh sách công thức theo phân trang -----
export const fetchRecipes = async (
    page: number = 1
): Promise<{ recipes: Recipe[]; total: number }> => {
    const res = await api.get("/api/recipes", {
        params: { page, per_page: PAGE_SIZE },
    });

    const rawData = res.data.data;

    return {
        recipes: rawData.map(mapRecipe),
        total: res.data.total,
    };
};

// ----- Lấy danh sách công thức ngẫu nhiên -----
export const fetchRandomRecipes = async (): Promise<{ recipes: Recipe[] }> => {
    try {
        const res = await api.get("/api/recipes/random/random-recipes");

        const items = Array.isArray(res.data?.data) ? res.data.data : [];
        const recipes = items.map(mapRecipe);

        return { recipes };
    } catch (error) {
        console.error("Lỗi fetchRandomRecipes:", error);
        return { recipes: [] };
    }
};

// ----- Lấy công thức theo ID -----
export const fetchRecipeById = async (id: number): Promise<Recipe> => {
    const res = await api.get(`/api/recipes/${id}`);
    return mapRecipe(res.data);
};
