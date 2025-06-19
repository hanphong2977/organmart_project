<?php

namespace App\Http\Controllers;

use App\Models\LibraryItem;
use Illuminate\Http\Request;

class LibraryItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = LibraryItem::where('user_id', auth()->id())
                            ->with('recipe')
                            ->get();

        return response()->json($items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        $item = LibraryItem::firstOrCreate([
            'user_id'   => auth()->id(),
            'recipe_id' => $validated['recipe_id'],
        ]);

        return response()->json($item, 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($recipe)
    {
        $deleted = LibraryItem::where('user_id', auth()->id())
                                  ->where('recipe_id', $recipe)
                                  ->delete();

        if (! $deleted) {
            return response()->json(['message' => 'Library item not found'], 404);
        }

        return response()->json($deleted);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = LibraryItem::find($id);
        if (! $item) {
            return response()->json(['message' => 'Library item not found'], 404);
        }

        $validated = $request->validate([
            'user_id'   => 'sometimes|required|exists:users,id',
            'recipe_id' => 'sometimes|required|exists:recipes,id',
        ]);

        $item->update($validated);

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = LibraryItem::find($id);
        if (! $item) {
            return response()->json(['message' => 'Library item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Library item deleted successfully']);
    }
}
